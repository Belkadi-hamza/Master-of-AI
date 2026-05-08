// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalStorage {
    enum ContractStatus {
        Pending,
        Active,
        Terminated,
        Completed
    }

    struct RentalAgreement {
        uint256 id;
        address landlord;
        address tenant;
        uint256 rentAmount;
        uint256 securityDeposit;
        uint256 dailyLateFee;
        uint256 startDate;
        uint256 nextDueDate;
        uint256 durationMonths;
        uint256 monthsPaid;
        uint256 totalLatePenaltyPaid;
        uint256 damageCost;
        string damageDescription;
        bool depositPaid;
        bool depositRefunded;
        bool terminatedByLandlord;
        bool terminatedByTenant;
        ContractStatus status;
    }

    uint256 public nextContractId = 1;

    mapping(uint256 => RentalAgreement) internal agreements;
    mapping(address => uint256[]) internal landlordContracts;
    mapping(address => uint256[]) internal tenantContracts;

    event RentalAgreementCreated(
        uint256 indexed contractId,
        address indexed landlord,
        address indexed tenant,
        uint256 rentAmount,
        uint256 securityDeposit,
        uint256 dailyLateFee,
        uint256 startDate,
        uint256 firstDueDate,
        uint256 durationMonths
    );

    event DepositPaid(
        uint256 indexed contractId,
        address indexed tenant,
        uint256 amount
    );

    event RentPaid(
        uint256 indexed contractId,
        address indexed tenant,
        uint256 baseRent,
        uint256 penalty,
        uint256 totalPaid,
        uint256 monthNumber
    );

    event ContractTerminatedByLandlord(
        uint256 indexed contractId,
        address indexed landlord,
        uint256 timestamp
    );

    event ContractTerminatedByTenant(
        uint256 indexed contractId,
        address indexed tenant,
        uint256 timestamp
    );

    event DamageReported(
        uint256 indexed contractId,
        uint256 damageCost,
        string damageDescription
    );

    event DepositRefunded(
        uint256 indexed contractId,
        address indexed tenant,
        uint256 refundedAmount
    );
}