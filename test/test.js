const { expect } = require("chai");

describe("SchusterianTestToken", function () {
    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
    
        const Token = await ethers.getContractFactory("SchusterianTestToken");
    
        const hardhatToken = await Token.deploy();
    
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});