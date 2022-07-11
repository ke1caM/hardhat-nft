const { developmentChains } = require("../../helper-hardhat-config")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Unit Test", function () {
          let nft, deployer
          const URI = "ipfs://QmNXWYo6uNbRuWsxzWhKzGgwFGkYwHrt6ZR3B7pRXnb7rc"
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              nft = await ethers.getContract("Nft", deployer)
              await nft.mintNft()
          })

          describe("NFT tokenURI", function () {
              it("has correct tokenURI", async function () {
                  const tokenURI = await nft.tokenURI("1")
                  assert.equal(tokenURI.toString(), URI.toString())
              })
          })

          describe("tokenCounter", function () {
              it("sets tokenId correctly", async function () {
                  const tokenCount = await nft.getTokenCounter()
                  assert.equal(tokenCount.toString(), "1")
              })
          })

          describe("handling exceptions", function () {
              it("reverst when mint is called more than once", async function () {
                  await expect(nft.mintNft()).to.be.revertedWith("Nft__OnlyOneUniqueNftIsCreated")
              })
          })
      })
