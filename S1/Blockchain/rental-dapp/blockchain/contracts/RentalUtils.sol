// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RentalStorage.sol";

contract RentalUtils is RentalStorage {
    function _calculateLateDays(uint256 contractId) internal view returns (uint256) {
        RentalAgreement storage ag = agreements[contractId];

        if (block.timestamp <= ag.nextDueDate) {
            return 0;
        }

        return (block.timestamp - ag.nextDueDate) / 1 days;
    }

    function _calculateLatePenalty(uint256 contractId) internal view returns (uint256) {
        RentalAgreement storage ag = agreements[contractId];
        uint256 lateDays = _calculateLateDays(contractId);
        return lateDays * ag.dailyLateFee;
    }

    function _calculateRefundAmount(uint256 contractId) internal view returns (uint256) {
        RentalAgreement storage ag = agreements[contractId];

        if (!ag.depositPaid || ag.depositRefunded) {
            return 0;
        }

        if (ag.damageCost >= ag.securityDeposit) {
            return 0;
        }

        return ag.securityDeposit - ag.damageCost;
    }

    function _isFinalized(RentalAgreement storage ag) internal view returns (bool) {
        return ag.status == ContractStatus.Terminated || ag.status == ContractStatus.Completed;
    }
}