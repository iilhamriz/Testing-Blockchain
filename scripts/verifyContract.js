// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require("@nomiclabs/hardhat-etherscan");
const hre = require("hardhat");
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelist = require("./whitelist.js");

const BASE_URI = "ipfs://QmWok5efQApHxp18UsLVkAAL3GjN9CjdHZtX64avH3rg6d/";
const proxyRegistryAddressRinkeby =
  "0xf57b2c51ded3a29e6891aba85459d600256cf317";
const proxyRegistryAddressMainnet =
  "0xa5409ec958c83c3f309868babaca7c86dcb077c1";

async function main() {
  // Calculate merkle root from the whitelist array
  const leafNodes = whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const root = merkleTree.getRoot();

  await hre.run("verify:verify", {
    address: "0xaD1dB5Abc0ddfC80DD13f2e23707340c1E7145FC",
    constructorArguments: [BASE_URI, root, proxyRegistryAddressRinkeby],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
