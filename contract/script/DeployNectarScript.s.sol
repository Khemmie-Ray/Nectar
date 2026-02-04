    // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";
// import {NectarToken} from "../src/NectarToken.sol";
import { SavingsFactory } from "../src/SavingsFactory.sol";

contract DeployNectarScript is Script {

    address owner = 0x748DE9BFBDD651bD461a1cf95F9D8c6F7ab93B06;
    address protocolFeeWallet = 0x748DE9BFBDD651bD461a1cf95F9D8c6F7ab93B06;

    function run() public {
        // address deployerPrivateKey = 0x748DE9BFBDD651bD461a1cf95F9D8c6F7ab93B06;
        vm.startBroadcast(owner);

        // // Deploy NectarToken
        // NectarToken nectarToken = new NectarToken();
        // console.log("NectarToken deployed at:", address(nectarToken));

        // Deploy SavingsFactory
        // constructor args: _subscriptionId, _protocolFeeWallet, _owner
        uint64 subscriptionId = 1; // Replace with actual subscription ID
        // address protocolFeeWallet = vm.envAddress("PROTOCOL_FEE_WALLET"); // Replace with actual wallet address
        // address owner = vm.envAddress("OWNER"); // Replace with actual owner address

        SavingsFactory savingsFactory = new SavingsFactory(subscriptionId, protocolFeeWallet, owner);
        console.log("SavingsFactory deployed at:", address(savingsFactory));
        vm.stopBroadcast();
    }

}
