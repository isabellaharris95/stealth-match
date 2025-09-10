import { ethers } from "hardhat";

async function main() {
  console.log("Deploying StealthMatch contract...");

  // Get the contract factory
  const StealthMatch = await ethers.getContractFactory("StealthMatch");

  // Deploy the contract with a verifier address (you can change this to your verifier address)
  const verifierAddress = "0x1234567890123456789012345678901234567890"; // Replace with actual verifier address
  
  const stealthMatch = await StealthMatch.deploy(verifierAddress);

  await stealthMatch.waitForDeployment();

  const contractAddress = await stealthMatch.getAddress();
  
  console.log("StealthMatch deployed to:", contractAddress);
  console.log("Verifier address:", verifierAddress);
  
  // Save the contract address to a file for frontend use
  const fs = require('fs');
  const contractInfo = {
    address: contractAddress,
    verifier: verifierAddress,
    network: "sepolia",
    deployedAt: new Date().toISOString()
  };
  
  fs.writeFileSync('./contract-info.json', JSON.stringify(contractInfo, null, 2));
  console.log("Contract info saved to contract-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
