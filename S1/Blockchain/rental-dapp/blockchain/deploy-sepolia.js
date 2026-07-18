const ethers = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function deploy() {
  const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
  const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;

  if (!SEPOLIA_RPC_URL || !SEPOLIA_PRIVATE_KEY) {
    console.error("Error: SEPOLIA_RPC_URL or SEPOLIA_PRIVATE_KEY not set in .env");
    process.exit(1);
  }

  // Connect to Sepolia
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC_URL);
  const wallet = new ethers.Wallet(SEPOLIA_PRIVATE_KEY, provider);
  
  console.log(`Deploying from account: ${wallet.address}`);
  
  // Get balance
  const balance = await provider.getBalance(wallet.address);
  console.log(`Account balance: ${ethers.formatEther(balance)} ETH`);

  // Read contract artifacts
  const rentalStorageArtifact = JSON.parse(
    fs.readFileSync(path.join(__dirname, "build/contracts/RentalStorage.json"), "utf8")
  );
  const rentalManagerArtifact = JSON.parse(
    fs.readFileSync(path.join(__dirname, "build/contracts/RentalManager.json"), "utf8")
  );

  // Deploy RentalStorage
  console.log("\nDeploying RentalStorage...");
  const StorageFactory = new ethers.ContractFactory(
    rentalStorageArtifact.abi,
    rentalStorageArtifact.bytecode,
    wallet
  );
  const storageContract = await StorageFactory.deploy();
  await storageContract.waitForDeployment();
  const storageAddress = await storageContract.getAddress();
  console.log(`RentalStorage deployed to: ${storageAddress}`);

  // Deploy RentalManager
  console.log("\nDeploying RentalManager...");
  const ManagerFactory = new ethers.ContractFactory(
    rentalManagerArtifact.abi,
    rentalManagerArtifact.bytecode,
    wallet
  );
  const managerContract = await ManagerFactory.deploy(storageAddress);
  await managerContract.waitForDeployment();
  const managerAddress = await managerContract.getAddress();
  console.log(`RentalManager deployed to: ${managerAddress}`);

  // Update .env with contract address
  console.log("\nUpdating .env with contract address...");
  let envContent = fs.readFileSync(path.join(__dirname, ".env"), "utf8");
  envContent = envContent.replace(/SEPOLIA_RENTAL_MANAGER_ADDRESS=.*/, `SEPOLIA_RENTAL_MANAGER_ADDRESS=${managerAddress}`);
  fs.writeFileSync(path.join(__dirname, ".env"), envContent);

  console.log("\n✓ Deployment completed successfully!");
  console.log("\nDeployment Summary:");
  console.log(`- RentalStorage: ${storageAddress}`);
  console.log(`- RentalManager: ${managerAddress}`);
  console.log("- .env updated with contract address");
}

deploy().catch((error) => {
  console.error("Deployment failed:", error);
  process.exit(1);
});
