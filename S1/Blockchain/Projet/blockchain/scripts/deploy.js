const hre = require("hardhat");

async function main() {
  const [deployer, tenant] = await hre.ethers.getSigners();

  const rentAmount = hre.ethers.parseEther("1");        // 1 ETH
  const securityDeposit = hre.ethers.parseEther("2");   // 2 ETH
  const latePenalty = hre.ethers.parseEther("0.1");     // 0.1 ETH

  const latestBlock = await hre.ethers.provider.getBlock("latest");
  const firstDueDate = latestBlock.timestamp + 3600; // 1 heure dans le futur
  const durationMonths = 6;

  const RentalContract = await hre.ethers.getContractFactory("RentalContract");
  const rentalContract = await RentalContract.deploy(
    tenant.address,
    rentAmount,
    securityDeposit,
    latePenalty,
    firstDueDate,
    durationMonths
  );

  await rentalContract.waitForDeployment();

  console.log("Deployer / Owner:", deployer.address);
  console.log("Tenant:", tenant.address);
  console.log("RentalContract deployed to:", await rentalContract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});