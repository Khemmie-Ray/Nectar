// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/console.sol";
import { SavingsFactory } from "../src/SavingsFactory.sol";
import { Test } from "forge-std/Test.sol";
import { DeployNectarScript } from "../script/DeployNectarScript.s.sol";

contract NectarScriptTest is Test {

    address owner = 0x748DE9BFBDD651bD461a1cf95F9D8c6F7ab93B06;
    address protocolFeeWallet = 0x748DE9BFBDD651bD461a1cf95F9D8c6F7ab93B06;
    DeployNectarScript deployNectarScript;
    address savingsFactory;

    function run() public {
        deployNectarScript = new DeployNectarScript();
        savingsFactory = deployNectarScript.run();
    }

}
