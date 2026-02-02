// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IYieldAdapter {
    function deposit(uint256 amount, bytes calldata data) external;
    function withdrawAll(uint256 totalAmount) external returns (uint256);
}
