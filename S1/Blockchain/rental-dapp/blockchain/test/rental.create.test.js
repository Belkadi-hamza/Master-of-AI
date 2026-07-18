const RentalManager = artifacts.require("RentalManager");

contract("RentalManager - Create", (accounts) => {
  const landlord = accounts[0];
  const tenant1 = accounts[1];
  const tenant2 = accounts[2];

  let manager;

  beforeEach(async () => {
    manager = await RentalManager.new({ from: landlord });
  });

  it("should create multiple rental agreements", async () => {
    const now = Math.floor(Date.now() / 1000);
    const rent = web3.utils.toWei("1", "ether");
    const deposit = web3.utils.toWei("2", "ether");
    const dailyFee = web3.utils.toWei("0.01", "ether");

    await manager.createRentalAgreement(
      tenant1, rent, deposit, dailyFee, now + 100, now + 200, 6,
      { from: landlord }
    );

    await manager.createRentalAgreement(
      tenant2, rent, deposit, dailyFee, now + 100, now + 200, 12,
      { from: landlord }
    );

    const landlordList = await manager.getLandlordContracts(landlord);
    assert.equal(landlordList.length, 2, "Landlord should have 2 contracts");

    const tenant1List = await manager.getTenantContracts(tenant1);
    const tenant2List = await manager.getTenantContracts(tenant2);

    assert.equal(tenant1List.length, 1);
    assert.equal(tenant2List.length, 1);
  });
});