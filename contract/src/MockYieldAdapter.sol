// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interface/IYieldAdapter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockYieldAdapter is IYieldAdapter {
    IERC20 public token;
    uint256 public totalDeposited;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function deposit(uint256 amount, bytes calldata data) external {
        token.transferFrom(msg.sender, address(this), amount);
        totalDeposited += amount;
    }

    function withdrawAll(uint256 totalAmount) external returns (uint256) {
        // fake 10% APY for demo
        uint256 profit = totalDeposited / 10;
        uint256 total = totalDeposited + profit;

        token.transfer(msg.sender, total);
        totalDeposited = 0;
        return total;
    }
}
