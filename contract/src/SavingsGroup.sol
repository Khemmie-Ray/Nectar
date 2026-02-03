// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import "@chainlink/contracts/src/v0.8/vrf/interfaces/VRFCoordinatorV2Interface.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/IYieldAdapter.sol";
import {ISavingsFactory} from "./interface/ISavingsFactory.sol";

contract SavingsGroup is VRFConsumerBaseV2 {
    /*//////////////////////////////////////////////////////////////
                                STORAGE
    //////////////////////////////////////////////////////////////*/

    IERC20 public immutable token;
    IYieldAdapter public immutable yieldAdapter;

    uint256 public immutable startTime;
    uint256 public immutable endTime;
    uint256 public immutable winnersCount;
    uint256 public immutable minDeposit;
    uint256 public immutable maxDeposit;
    uint256 public immutable minMembers;
    uint256 public immutable maxMembers;
    uint256 public immutable totalexpectedDepositPerUser;
    address public immutable PROTOCOL;
    uint256 public immutable protocolFee;
    uint256 public totalDeposited;
    uint256 public protocolFeeBps = 100;
    address[] public members;
    uint256 public totalDepositGoal;
    uint256 totalProfitShared;
    mapping(address => uint256) public balances;

    address[] public winners;
    mapping(address => bool) public isWinner;

    address[] public eligibleMembers;
    mapping(address => bool) public isEligible;

    bool public yieldDistributed;

    /*//////////////////////////////////////////////////////////////
                            CHAINLINK VRF
    //////////////////////////////////////////////////////////////*/

    VRFCoordinatorV2Interface public coordinator;
    uint64 public subscriptionId;
    address vrfCoordinator = 0x5C210eF41CD1a72de73bF76eC39637bB0d3d7BEE;
    bytes32 keyHash = 0x9e1344a1247c8a1785d0a4681a27152bffdb43666ae5bf7d14d24a5efd44bf71;
    uint32 public callbackGasLimit = 2500000;
    uint16 public constant CONFIRMATIONS = 3;

    uint256 public pendingProfit;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Deposited(address indexed user, uint256 amount);
    event YieldRequested(uint256 profit);
    event YieldDistributed(address[] winners, uint256 rewardPerWinner);
    event Withdrawn(address indexed user, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                              CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(ISavingsFactory.SingleYieldInfo memory yieldInfo, uint64 _subscriptionId, address _protocol)
        VRFConsumerBaseV2(vrfCoordinator)
    {
        require(yieldInfo.winnersCount > 0, "Invalid winners count");
        require(yieldInfo.startTime > block.timestamp, "cannot start in the past");
        require(yieldInfo.duration > 0, "Invalid duration");
        // require(yieldInfo.minDeposit > 0, "Invalid min deposit");
        // require(yieldInfo.maxDeposit > yieldInfo.minDeposit, "Invalid max deposit");
        // require(yieldInfo.minMembers > 0, "Invalid min members");
        // require(yieldInfo.maxMembers > yieldInfo.minMembers, "Invalid max members");
        // require(yieldInfo.totalexpectedDepositPerUser > 0, "Invalid expected deposit per user");

        token = IERC20(yieldInfo.token);
        yieldAdapter = IYieldAdapter(yieldInfo.yieldAdapter);

        startTime = yieldInfo.startTime;
        endTime = yieldInfo.startTime + yieldInfo.duration;
        minDeposit = yieldInfo.minDeposit;
        maxDeposit = yieldInfo.maxDeposit;
        minMembers = yieldInfo.minMembers;
        maxMembers = yieldInfo.maxMembers;
        totalexpectedDepositPerUser = yieldInfo.totalexpectedDepositPerUser;
        winnersCount = yieldInfo.winnersCount;
        totalDepositGoal = yieldInfo.totalDepositGoal;
        PROTOCOL = _protocol;

        coordinator = VRFCoordinatorV2Interface(vrfCoordinator);
        subscriptionId = _subscriptionId;
    }

    /*//////////////////////////////////////////////////////////////
                                VIEWS
    //////////////////////////////////////////////////////////////*/

    function memberCount() external view returns (uint256) {
        return members.length;
    }

    function winnersCountActual() external view returns (uint256) {
        return winners.length;
    }

    function getWinners() external view returns (address[] memory) {
        return winners;
    }

    function getMembers() external view returns (address[] memory) {
        return members;
    }

    function getWinner(address user) external view returns (bool) {
        require(yieldDistributed, "Yield not distributed, winner not selected yet");
        return isWinner[user];
    }

    function totalDeposits() public view returns (uint256 total) {
        return totalDeposited;
    }

    function viewtotalDepositGoal() public view returns (uint256 total) {
        return totalDepositGoal;
    }

    /*//////////////////////////////////////////////////////////////
                              USER ACTIONS
    //////////////////////////////////////////////////////////////*/

    function deposit(uint256 amount) external {
        require(block.timestamp < endTime, "Savings ended");
        require(amount > 0, "Zero amount");

        if (balances[msg.sender] == 0) {
            members.push(msg.sender);
        }

        balances[msg.sender] += amount;

        token.transferFrom(msg.sender, address(this), amount);
        // eligibility check
        if (balances[msg.sender] >= totalexpectedDepositPerUser && !isEligible[msg.sender]) {
            isEligible[msg.sender] = true;
            eligibleMembers.push(msg.sender);
        }
        totalDeposited += amount;
        // delegate call deposit here
        (bool success, bytes memory data) =
            address(yieldAdapter).delegatecall(abi.encodeWithSignature("deposit(uint256,bytes)", amount, new bytes(0)));
        require(success, "Deposit failed");
        emit Deposited(msg.sender, amount);
    }

    function withdraw() external {
        require(block.timestamp >= endTime, "Savings ongoing");
        require(yieldDistributed, "Yield not distributed");

        uint256 amount = balances[msg.sender];
        require(amount > 0, "Nothing to withdraw");

        balances[msg.sender] = 0;
        token.transfer(msg.sender, amount);

        emit Withdrawn(msg.sender, amount);
    }

    function selectWinnerAndDistributeYield(uint256[] calldata randomNumbers) external {
        require(msg.sender == PROTOCOL, "Not authorized");
        require(block.timestamp >= endTime, "Too early");
        require(!yieldDistributed, "Already distributed");
        require(members.length >= winnersCount, "Not enough members");
        require(eligibleMembers.length >= winnersCount, "Not enough eligible users");
        require(randomNumbers.length >= winnersCount, "Not enough random numbers");
        // delegate call withdrawAll here withdrawAll(uint totalAmount)
        (bool success, bytes memory data) =
            address(yieldAdapter).delegatecall(abi.encodeWithSignature("withdrawAll(uint256)", totalDeposits()));
        require(success, "Withdraw failed");
        uint256 totalReturned = abi.decode(data, (uint256));
        uint256 principal = totalDeposits();
        if (totalReturned == principal) {
            yieldDistributed = true;
            pendingProfit = 0;
            return;
        } else {
            require(totalReturned > principal, "No profit");
            // calculate protocol fee from pendingProfit
            uint256 protocolFeeAmount = pendingProfit * protocolFeeBps / 10_000; // 1% protocol fee
            token.transfer(PROTOCOL, protocolFeeAmount);
            pendingProfit = totalReturned - principal - protocolFeeAmount;
            totalProfitShared = pendingProfit;
            uint256 rewardPerWinner = pendingProfit / winnersCount;
            uint256 eligibleLen = eligibleMembers.length;

            for (uint256 i = 0; i < randomNumbers.length; i++) {
                uint256 idx = randomNumbers[i] % eligibleLen;
                address winner = eligibleMembers[idx];

                if (isWinner[winner]) {
                    i--;
                    continue;
                }

                isWinner[winner] = true;
                winners.push(winner);
                balances[winner] += rewardPerWinner;
                pendingProfit -= rewardPerWinner;
            }

            yieldDistributed = true;
            emit YieldDistributed(winners, rewardPerWinner);
        }

        emit YieldRequested(pendingProfit);
    }

    /*//////////////////////////////////////////////////////////////
                          YIELD DISTRIBUTION
    //////////////////////////////////////////////////////////////*/

    function requestYieldDistribution() external {
        require(block.timestamp >= endTime, "Too early");
        require(!yieldDistributed, "Already distributed");
        require(members.length >= winnersCount, "Not enough members");
        require(eligibleMembers.length >= winnersCount, "Not enough eligible users");
        // delegate call withdrawAll here withdrawAll(uint totalAmount)
        (bool success, bytes memory data) =
            address(yieldAdapter).delegatecall(abi.encodeWithSignature("withdrawAll(uint256)", totalDeposits()));
        require(success, "Withdraw failed");
        uint256 totalReturned = abi.decode(data, (uint256));
        uint256 principal = totalDeposits();
        if (totalReturned == principal) {
            yieldDistributed = true;
            pendingProfit = 0;
            return;
        } else {
            require(totalReturned > principal, "No profit");
            // calculate protocol fee from pendingProfit
            uint256 protocolFeeAmount = pendingProfit * protocolFeeBps / 10_000; // 1% protocol fee
            token.transfer(PROTOCOL, protocolFeeAmount);
            pendingProfit = totalReturned - principal - protocolFeeAmount;
            totalProfitShared = pendingProfit;
            uint256 requestID = coordinator.requestRandomWords(
                keyHash, subscriptionId, CONFIRMATIONS, callbackGasLimit, uint32(winnersCount)
            );
        }

        emit YieldRequested(pendingProfit);
    }

    function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
        uint256 rewardPerWinner = pendingProfit / winnersCount;
        uint256 eligibleLen = eligibleMembers.length;

        for (uint256 i = 0; i < randomWords.length; i++) {
            uint256 idx = randomWords[i] % eligibleLen;
            address winner = eligibleMembers[idx];

            if (isWinner[winner]) {
                i--;
                continue;
            }

            isWinner[winner] = true;
            winners.push(winner);
            balances[winner] += rewardPerWinner;
            pendingProfit -= rewardPerWinner;
        }

        yieldDistributed = true;
        emit YieldDistributed(winners, rewardPerWinner);
    }

    // in a scenrio when all the users anre not eligible or the num isnt up to winners we shoudl withdraw all profit to protocol
    function withdrawUnusedProfit() external {
        require(!yieldDistributed, "Yield distributed");
        require(pendingProfit > 0, "No profit");
        token.transfer(PROTOCOL, pendingProfit);
        pendingProfit = 0;
    }
}
