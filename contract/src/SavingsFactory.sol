// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import { SavingsGroup } from "./SavingsGroup.sol";
import { ISavingsFactory } from "./interface/ISavingsFactory.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract SavingsFactory is ISavingsFactory, Ownable {

    uint256 public groupCount;
    // base testnet

    uint64 immutable SubscriptionId;
    address public PROTOCOL_FEE_WALLET;

    mapping(uint256 => GroupInfo) public groups;

    event GroupCreated(uint256 indexed id, address indexed group, address indexed owner, string name);

    constructor(uint64 _subscriptionId, address _protocolFeeWallet, address _owner) Ownable(_owner) {
        SubscriptionId = _subscriptionId;
        PROTOCOL_FEE_WALLET = _protocolFeeWallet;
    }

    function createGroupSingleYieldAdapter(SingleYieldInfo memory yieldInfo) external returns (address) {
        groupCount++;

        SavingsGroup group = new SavingsGroup(yieldInfo, SubscriptionId, PROTOCOL_FEE_WALLET);

        groups[groupCount] = GroupInfo({
            group: address(group),
            owner: msg.sender,
            name: yieldInfo.name,
            uri: yieldInfo.uri,
            totalDepositGoal: yieldInfo.totalDepositGoal,
            additionalInfo: yieldInfo.additionalInfo
        });

        emit GroupCreated(groupCount, address(group), msg.sender, yieldInfo.name);
        return address(group);
    }

    function getGroup(uint256 id) external view returns (GroupInfo memory) {
        return groups[id];
    }

    function getAllGroups() external view returns (GroupInfo[] memory) {
        GroupInfo[] memory groupsArray = new GroupInfo[](groupCount);
        for (uint256 i = 0; i < groupCount; i++) {
            groupsArray[i] = groups[i];
        }
        return groupsArray;
    }

    function setProtocolFeeWallet(address _protocolFeeWallet) external onlyOwner {
        PROTOCOL_FEE_WALLET = _protocolFeeWallet;
    }

}
