const RentalManager = artifacts.require("RentalManager");

contract("RentalManager - Deposit", (accounts) => {
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
      now + 200,
      6,
      { from: landlord }
    );
  });

  it("should allow tenant to pay deposit", async () => {
    const details = await manager.getAgreementDetails(contractId);
    const deposit = details.securityDeposit || details[4];

    await manager.payDeposit(contractId, {
      from: tenant,
      value: deposit
    });

    const updated = await manager.getAgreementDetails(contractId);
    const depositPaid = updated.depositPaid || updated[13];

    assert.equal(depositPaid, true, "Deposit should be paid");
  });
});