const { expect } = require("chai");

describe("SchusterianTestFaucet", function () {
  let Token;
  let schusterToken;
  let Faucet;
  let faucet;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("SchusterTestToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    schusterToken = await Token.deploy();

    Faucet = await ethers.getContractFactory("SchusterEtherFaucet");
    faucet = await Faucet.deploy(schusterToken.address);

    const transactionHashToken = await schusterToken.transfer(addr1.address, ethers.utils.parseEther("300"));
  });

  describe("Faucet Supply", function () {   
    beforeEach(async function () {
        // Send 100 ETH to the faucet to prime it
        const transactionHash = await owner.sendTransaction({
          to: faucet.address,
          value: ethers.utils.parseEther("100.0"),
      });
    });

    it("Should have 100 Ethereum", async function () {
      const initialBalance = await faucet.getBalance();
      expect(initialBalance).to.equal(ethers.utils.parseEther("100"));
    });

    it("Should increase if another person sends tokens", async function () {
      const initialBalance = await faucet.getBalance();
      const tx = await addr1.sendTransaction({
        to: faucet.address,
        value: ethers.utils.parseEther("1.0")
      })

      const newBalance = await faucet.getBalance();
      expect(newBalance).to.equal(initialBalance.add(ethers.utils.parseEther("1.0")));
    });
  });

  describe("Faucet", function () {
    it("Should not send funds if there are no tokens to give", async function () {
      await expect(
        faucet.faucet(addr1.address)
      ).to.be.revertedWith("Insufficient Faucet Funds");
      
      const transactionHash0 = await owner.sendTransaction({
        to: faucet.address,
        value: ethers.utils.parseEther("0.5"),
      });

      await expect(
        faucet.faucet(addr1.address)
      ).to.be.revertedWith("Insufficient Faucet Funds");

      const transactionHash1 = await owner.sendTransaction({
        to: faucet.address,
        value: ethers.utils.parseEther("0.5"),
      });

      await faucet.faucet(addr1.address); // Success

    })

    it("Should Send 1 Ether to Person Who Asks", async function () {
      // Send 100 ETH to the faucet to prime it
      const transactionHash = await owner.sendTransaction({
        to: faucet.address,
        value: ethers.utils.parseEther("100.0"),
      });

      const addr1InitialBalance = await addr1.getBalance();

      await faucet.faucet(addr1.address);

      const addr1NewBalance = await addr1.getBalance(); 

      expect(addr1NewBalance).to.equal(addr1InitialBalance.add(ethers.utils.parseEther("1.0")));
    });

    it("Should Not Send Ether before Timeout, but should after the timeout", async function () {
      // Send 100 ETH to the faucet to prime it
      const transactionHash = await owner.sendTransaction({
        to: faucet.address,
        value: ethers.utils.parseEther("100.0"),
      });

      await faucet.faucet(addr1.address); //Success
      await expect(
        faucet.faucet(addr1.address)
      ).to.be.revertedWith("Too Early for Another Faucet Drop"); //Failure

      await network.provider.send("evm_increaseTime", [3600 * 12]);
      await expect(
        faucet.faucet(addr1.address)
      ).to.be.revertedWith("Too Early for Another Faucet Drop"); //Failure

      await network.provider.send("evm_increaseTime", [3600 * 12]);
      await faucet.faucet(addr1.address); //Success
    });

  it("Should not send tokens if there is insufficient ERC20 tokens", async function () {
    // Send 100 ETH to the faucet to prime it
    const transactionHash = await owner.sendTransaction({
      to: faucet.address,
      value: ethers.utils.parseEther("100.0"),
    });

    await expect(
      faucet.faucet(addr2.address)
    ).to.be.revertedWith("You Do Not Have Enough ERC20 tokens"); //Fail

    const transactionHashToken0 = await schusterToken.transfer(addr2.address, ethers.utils.parseEther("100"));

    await expect(
      faucet.faucet(addr2.address)
    ).to.be.revertedWith("You Do Not Have Enough ERC20 tokens"); //Fail

    const transactionHashToken1 = await schusterToken.transfer(addr2.address, ethers.utils.parseEther("200"));

    await faucet.faucet(addr2.address); //Success

  });


  });
});