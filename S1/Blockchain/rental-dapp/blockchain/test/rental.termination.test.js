const RentalManager = artifacts.require("RentalManager");

contract("RentalManager - Termination", (accounts) => {
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

  it("should allow landlord to terminate", async () => {
    await manager.terminateByLandlord(contractId, { from: landlord });

    const details = await manager.getAgreementDetails(contractId);
    const terminatedByLandlord = details.terminatedByLandlord || details[15];

    assert.equal(terminatedByLandlord, true);
  });

  it("should allow tenant to terminate", async () => {
    await manager.terminateByTenant(contractId, { from: tenant });

    const details = await manager.getAgreementDetails(contractId);
    const terminatedByTenant = details.terminatedByTenant || details[16];

    assert.equal(terminatedByTenant, true);
  });
});