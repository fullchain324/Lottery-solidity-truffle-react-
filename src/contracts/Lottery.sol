// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;

    constructor() {
        manager = msg.sender;
    }

    modifier restricted() {
        require(manager == msg.sender, 'you are not a manager');
        _;
    }

    function enter() public payable {
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }

    function random() public view returns (uint ) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted {
        require(players.length > 0, 'there are no players');
        uint index = random() % players.length;
        payable(players[index]).transfer(address(this).balance);
        lastWinner = players[index];
        players = new address[](0);
    }
    function getPlayers() public view returns(address[] memory) {
        return players;
    }
}