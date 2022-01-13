# Chainlink VRF Demo

This project demonstrates the basic Chainlink VRF dependencies and functions. There are two core functions that are necessary: requestRandomness and fulfillRandomness.  VRF follows the Request & Receive Data cycle which means that the request (requestRandomness) for a random number is sent in one transaction and then the random number is received (fulfillRandomness) from another transaction in a later block.  The default settings are for the Chainlink node to respond with the random number 10 blocks after it receives the initial request.  A requestId is returned immediately upon request of the random number and the same requestId is sent along with the random number when the request is fulfilled.  The requestId can be stored in your smart contracts storage and used to associate the random number response in a subsequent transaction.
