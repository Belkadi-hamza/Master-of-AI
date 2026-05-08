const RentalManager = artifacts.require("RentalManager");

contract("RentalManager - Penalty", (accounts) => {
  const landlord = accounts[0];
  const tenant = accounts[1];
  let manager;
  let contractId = 1;

  beforeEach(async () => {
    manager = await RentalManager.new({ from: landlord });

    // Get current blockchain time
    const block = await web3.eth.getBlock("latest");
    const now = block.timestamp;

    // Start date: 1 day from now
    const startDate = now + daysToSeconds(1);
    // Due date: 2 days from now (1 day after start)
    const dueDate = now + daysToSeconds(2);

    await manager.createRentalAgreement(
      tenant,
      web3.utils.toWei("1", "ether"),
      web3.utils.toWei("2", "ether"),
      web3.utils.toWei("0.01", "ether"),
      startDate,
      dueDate,
      6,
      { from: landlord }
    );

    await manager.payDeposit(contractId, {
      from: tenant,
      value: web3.utils.toWei("2", "ether")
    });

    // Advance time by 5 days to go past due date
    await new Promise((resolve, reject) => {
      web3.currentProvider.send(
        { jsonrpc: "2.0", method: "evm_increaseTime", params: [daysToSeconds(5)], id: 0 },
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
    
    // Mine a new block to apply timestamp changes
    await new Promise((resolve, reject) => {
      web3.currentProvider.send(
        { jsonrpc: "2.0", method: "evm_mine", params: [], id: 1 },
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  });

  it("should calculate exact daily penalty", async () => {
    const lateDays = await manager.getLateDays(contractId);
    const penalty = await manager.getLatePenalty(contractId);

    assert(lateDays.toNumber() >= 3, "Late days should be at least 3");

    const expectedPenalty = web3.utils.toBN(web3.utils.toWei("0.01", "ether"))
      .mul(web3.utils.toBN(lateDays.toString()));

    assert.equal(penalty.toString(), expectedPenalty.toString(), "Penalty mismatch");
  });

  function daysToSeconds(days) {
    return days * 24 * 60 * 60;
  }
});