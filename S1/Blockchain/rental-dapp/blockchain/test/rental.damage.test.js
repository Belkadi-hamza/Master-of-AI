const RentalManager = artifacts.require("RentalManager");

contract("RentalManager - Damage & Refund", (accounts) => {
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

    await manager.payDeposit(contractId, {
      from: tenant,
      value: web3.utils.toWei("2", "ether")
    });

    await manager.terminateByLandlord(contractId, { from: landlord });
  });

  it("should report damage and refund reduced deposit", async () => {
    const damage = web3.utils.toWei("0.5", "ether");

    await manager.reportDamage(contractId, damage, "Broken chair", {
      from: landlord
    });

    const beforeBalance = web3.utils.toBN(await web3.eth.getBalance(tenant));

    await manager.refundDeposit(contractId, { from: landlord });

    const afterBalance = web3.utils.toBN(await web3.eth.getBalance(tenant));

    assert(afterBalance.gt(beforeBalance), "Tenant should receive refund");

    const details = await manager.getAgreementDetails(contractId);
    const damageCost = details.damageCost || details[11];

    assert.equal(damageCost.toString(), damage, "Damage cost mismatch");
  });
});