const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RentalContract", function () {
  let RentalContract;
  let rentalContract;
  let owner;
  let tenant;
  let other;

  let rentAmount;
  let securityDeposit;
  let latePenalty;
  let firstDueDate;
  let durationMonths;

  beforeEach(async function () {
    [owner, tenant, other] = await ethers.getSigners();

    rentAmount = ethers.parseEther("1");
    securityDeposit = ethers.parseEther("2");
    latePenalty = ethers.parseEther("0.1");
    durationMonths = 6;

    const latestBlock = await ethers.provider.getBlock("latest");
    firstDueDate = latestBlock.timestamp + 3600;

    RentalContract = await ethers.getContractFactory("RentalContract");
    rentalContract = await RentalContract.deploy(
      tenant.address,
      rentAmount,
      securityDeposit,
      latePenalty,
      firstDueDate,
      durationMonths
    );

    await rentalContract.waitForDeployment();
  });

  it("should initialize the contract correctly", async function () {
    expect(await rentalContract.owner()).to.equal(owner.address);
    expect(await rentalContract.tenant()).to.equal(tenant.address);
    expect(await rentalContract.rentAmount()).to.equal(rentAmount);
    expect(await rentalContract.securityDeposit()).to.equal(securityDeposit);
    expect(await rentalContract.latePenalty()).to.equal(latePenalty);
    expect(await rentalContract.durationMonths()).to.equal(durationMonths);
    expect(await rentalContract.isActive()).to.equal(true);
  });

  it("should allow tenant to pay deposit", async function () {
    await expect(
      rentalContract.connect(tenant).payDeposit({ value: securityDeposit })
    ).to.emit(rentalContract, "DepositPaid");

    expect(await rentalContract.depositPaid()).to.equal(true);
    expect(await ethers.provider.getBalance(await rentalContract.getAddress())).to.equal(securityDeposit);
  });

  it("should reject deposit payment from non-tenant", async function () {
    await expect(
      rentalContract.connect(other).payDeposit({ value: securityDeposit })
    ).to.be.revertedWith("Only tenant can call this function");
  });

  it("should reject wrong deposit amount", async function () {
    await expect(
      rentalContract.connect(tenant).payDeposit({ value: ethers.parseEther("1") })
    ).to.be.revertedWith("Incorrect deposit amount");
  });

  it("should allow tenant to pay rent on time", async function () {
    await rentalContract.connect(tenant).payDeposit({ value: securityDeposit });

    await expect(
      rentalContract.connect(tenant).payRent({ value: rentAmount })
    ).to.emit(rentalContract, "RentPaid");

    expect(await rentalContract.monthsPaid()).to.equal(1);
  });

  it("should reject rent payment before deposit", async function () {
    await expect(
      rentalContract.connect(tenant).payRent({ value: rentAmount })
    ).to.be.revertedWith("Deposit must be paid first");
  });

  it("should apply late penalty when rent is paid after due date", async function () {
    await rentalContract.connect(tenant).payDeposit({ value: securityDeposit });

    await ethers.provider.send("evm_increaseTime", [3600 + 10]);
    await ethers.provider.send("evm_mine");

    const rentDue = await rentalContract.getRentDue();
    expect(rentDue).to.equal(rentAmount + latePenalty);

    await expect(
      rentalContract.connect(tenant).payRent({ value: rentDue })
    ).to.emit(rentalContract, "RentPaid");

    expect(await rentalContract.monthsPaid()).to.equal(1);
  });

  it("should allow owner to terminate contract", async function () {
    await expect(rentalContract.connect(owner).terminateContract())
      .to.emit(rentalContract, "ContractTerminated");

    expect(await rentalContract.isActive()).to.equal(false);
  });

  it("should reject termination by non-owner", async function () {
    await expect(
      rentalContract.connect(tenant).terminateContract()
    ).to.be.revertedWith("Only owner can call this function");
  });

  it("should allow refund of deposit after termination", async function () {
    await rentalContract.connect(tenant).payDeposit({ value: securityDeposit });

    await rentalContract.connect(owner).terminateContract();

    const tenantBalanceBefore = await ethers.provider.getBalance(tenant.address);

    const tx = await rentalContract.connect(owner).refundDeposit();
    const receipt = await tx.wait();

    const gasUsed = receipt.gasUsed * receipt.gasPrice; // owner pays gas, not tenant

    const tenantBalanceAfter = await ethers.provider.getBalance(tenant.address);

    expect(await rentalContract.depositRefunded()).to.equal(true);
    expect(tenantBalanceAfter).to.equal(tenantBalanceBefore + securityDeposit);

    // gasUsed is intentionally computed to show tx details, though not needed for tenant balance
    expect(gasUsed >= 0n).to.equal(true);
  });

  it("should reject refund while contract is still active", async function () {
    await rentalContract.connect(tenant).payDeposit({ value: securityDeposit });

    await expect(
      rentalContract.connect(owner).refundDeposit()
    ).to.be.revertedWith("Contract is still active");
  });

  it("should deactivate automatically after all months are paid", async function () {
    const RentalContract2 = await ethers.getContractFactory("RentalContract");

    const latestBlock = await ethers.provider.getBlock("latest");
    const dueDate = latestBlock.timestamp + 3600;

    const shortContract = await RentalContract2.deploy(
      tenant.address,
      rentAmount,
      securityDeposit,
      latePenalty,
      dueDate,
      1
    );

    await shortContract.waitForDeployment();

    await shortContract.connect(tenant).payDeposit({ value: securityDeposit });
    await shortContract.connect(tenant).payRent({ value: rentAmount });

    expect(await shortContract.monthsPaid()).to.equal(1);
    expect(await shortContract.isActive()).to.equal(false);
  });
});