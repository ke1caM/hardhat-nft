const { ethers } = require("hardhat")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deployer } = await getNamedAccounts()
    const { log } = deployments
    log("Getting contract...")
    const nft = await ethers.getContract("Nft", deployer)
    log("Minting NFT...")
    await nft.mintNft()
    log("All done!")
}

module.exports.tags = ["mint"]
