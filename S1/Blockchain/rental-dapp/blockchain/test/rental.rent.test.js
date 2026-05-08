const RentalManager = artifacts.require("RentalManager");

contract("RentalManager - Rent", (accounts) => {
  const landlord = accounts[0];
  const tenant = accounts[1];
  let manager;
  let contractId = 1;

  beforeEach(async () => {
    manager = await RentalManager.new({ from: landlord });

    const now = Math.floor(Date.now() / 1000);

    await manager.createRentalAgreement(
      tenant,
      web3.utils.toWei("1", "ether"),
      web3.utils.toWei("2", "ether"),
      web3.utils.toWei("0.01", "ether"),
      now + 100,
      now + 5000,
      6,
      { from: landlord }
    );

    await manager.payDeposit(contractId, {
      from: tenant,
      value: web3.utils.toWei("2", "ether")
    });
  });

  it("should allow tenant to pay rent", async () => {
    const totalDue = await manager.getRentDue(contractId);

    await manager.payRent(contractId, {
      from: tenant,
      value: totalDue.toString()
    });

    const details = await manager.getAgreementDetails(contractId);
    const monthsPaid = details.monthsPaid || details[9];

    assert.equal(monthsPaid.toString(), "1", "Months paid should be 1");
  });
});