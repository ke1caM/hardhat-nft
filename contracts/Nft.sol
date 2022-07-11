// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

error Nft__OnlyOneUniqueNftIsCreated();

/**@title Simple NFT
 * @author ke1caM
 * @notice This contract creates one uniqe NFT representing pixel art
 * @dev Created using Openzeppelin contracts
 */

/** WARNING! This code is created in learing purposes ONLY! */
/** Please do not use this code on MAINNET! */

contract Nft is ERC721 {
    /** VARIABLES */

    string private TOKEN_URI = "ipfs://QmNXWYo6uNbRuWsxzWhKzGgwFGkYwHrt6ZR3B7pRXnb7rc";
    uint256 private s_tokenCounter;

    /** MAIN FUNCTIONS */

    constructor() ERC721("ILoveNFT", "ILN") {
        s_tokenCounter = 0;
    }

    /*
     * @notice Method for minting NFT
     * @param returns tokenId of NFT
     * @param ONLY ONE uniqe NFT is created
     */

    function mintNft() public returns (uint256) {
        s_tokenCounter++;
        if (s_tokenCounter == 1) {
            _safeMint(msg.sender, s_tokenCounter);
            return s_tokenCounter;
        } else {
            revert Nft__OnlyOneUniqueNftIsCreated();
        }
    }

    /** GETTER FUNCTIONS */

    function tokenURI(
        uint256 /*tokenId*/
    ) public view override returns (string memory) {
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
