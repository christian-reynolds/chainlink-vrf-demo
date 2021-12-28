const { expect } = require("chai");
const { ethers } = require("hardhat");

const LINKAddress = "0x01be23585060835e02b77ef475b0cc51aa1e0709";
const INITIAL_AMOUNT = "100";

describe("Randomness", function () {
  let Randomness_Instance;
  let LINK_TokenContract;

  before(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();

    // this account needs to be unlocked when the chain is forked
    // npx ganache-cli -f https://rinkeby.infura.io/v3/{ProjectId} --unlock 0xfed4ddb595f42a5dbf48b9f318ad9b8e2685c27b -p 8545
    const whale = await ethers.getSigner(
      "0xfed4ddb595f42a5dbf48b9f318ad9b8e2685c27b"
    );
    
    // Get contract instances of DAI and USDC
    LINK_TokenContract = await ethers.getContractAt("ERC20", LINKAddress);
    
    const symbol = await LINK_TokenContract.symbol();

    console.log("symbol: ", symbol);

    // Get an instance of our DeFi contract
    const Randomness = await ethers.getContractFactory("Randomness");

    Randomness_Instance = await Randomness.deploy();
    await Randomness_Instance.deployed();

    console.log("Randomness_Instance: ", Randomness_Instance.address);

    // Transfer LINK from the whale to the randomness address
    await LINK_TokenContract.connect(whale).transfer(
      Randomness_Instance.address,
      ethers.utils.parseUnits(INITIAL_AMOUNT)
    );

    console.log("LINK Balance: ", ethers.utils.formatUnits(await LINK_TokenContract.balanceOf(Randomness_Instance.address)));
  });

  it("Should console.log", async function () {
    const requestTx = await Randomness_Instance.getRandomNumber();
    await requestTx.wait();
    
    
  });
});
