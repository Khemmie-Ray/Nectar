// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISavingsFactory {
    struct SingleYieldInfo {
        string name;
        address yieldAdapter;
        address token;
        uint256 startTime;
        uint256 duration;
        uint256 winnersCount;
        uint256 minDeposit;
        uint256 maxDeposit;
        uint256 minMembers;
        uint256 maxMembers;
        uint256 totalexpectedDepositPerUser;
        uint256 totalDepositGoal;
        string uri;
        bytes additionalInfo;
    }

    struct GroupInfo {
        address group;
        address owner;
        string name;
        string uri;
        uint256 totalDepositGoal;
        bytes additionalInfo;
    }

    function createGroupSingleYieldAdapter(SingleYieldInfo memory yieldInfo) external returns (address);
    function getAllGroups() external view returns (GroupInfo[] memory);
    function getGroup(uint256 id) external view returns (GroupInfo memory);
}
