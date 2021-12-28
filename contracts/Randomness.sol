// SPDX-License-Identifier: ISC
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "hardhat/console.sol";

contract Randomness is VRFConsumerBase {

    bytes32 public keyHash;
    uint256 public fee;
    uint256 public randomResult;

    mapping(bytes32 => bool) requestProcessed;

    constructor() 
        VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B, // VRF Coordinator
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709  // LINK Token
        ) 
    {
        keyHash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 100000000000000000;
    }

    // Unfinished code using Chainlink VRF
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        requestId = requestRandomness(keyHash, fee);
        requestProcessed[requestId] = false;
        console.log("This is the requestId: %s", uint(requestId));
        return requestId;
    }

    // Unfinished code using Chainlink VRF
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        requestProcessed[requestId] = true;
        randomResult = randomness;
    }

}