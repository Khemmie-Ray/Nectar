    // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import { AaveYieldAdapter } from "../../src/adapters/AaveUdscAdapter.sol";

contract DeployAaveUSdcAdapterScript is Script {

    function run() external {
        vm.startBroadcast();
        address asset = address(0);
        address pool = address(0);
        AaveYieldAdapter aaveYieldAdapter = new AaveYieldAdapter(asset, pool);
        console.log("AaveYieldAdapter deployed at:", address(aaveYieldAdapter));
        vm.stopBroadcast();
    }

}
