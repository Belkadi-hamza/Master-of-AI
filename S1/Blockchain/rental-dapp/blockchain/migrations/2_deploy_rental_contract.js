const RentalManager = artifacts.require("RentalManager");

module.exports = async function (deployer) {
  await deployer.deploy(RentalManager);
};