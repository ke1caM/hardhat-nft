const { developmentChains } = require("../helper-hardhat-config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments
    let waitConfirmations
    if (developmentChains.includes(network.name)) {
        waitConfirmations = 1
    } else {
        waitConfirmations = 6
    }
    const args = []

    // Deploying NFT
    const nft = await deploy("Nft", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitConfirmations,
    })

    // Veryfing on etherscan
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(nft.address, args)
    }
}

module.exports.tags = ["all", "tornado"]
