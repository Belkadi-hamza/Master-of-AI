// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RentalUtils.sol";

contract RentalManager is RentalUtils {
    modifier agreementExists(uint256 contractId) {
        require(contractId > 0 && contractId < nextContractId, "Contract does not exist");
        _;
    }

    modifier onlyLandlord(uint256 contractId) {
        require(msg.sender == agreements[contractId].landlord, "Only landlord can call");
        _;
    }

    modifier onlyTenant(uint256 contractId) {
        require(msg.sender == agreements[contractId].tenant, "Only tenant can call");
        _;
    }

    modifier onlyActive(uint256 contractId) {
        require(agreements[contractId].status == ContractStatus.Active, "Contract is not active");
        _;
    }

    function createRentalAgreement(
        address _tenant,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _dailyLateFee,
        uint256 _startDate,
        uint256 _firstDueDate,
        uint256 _durationMonths
    ) external returns (uint256) {
        require(_tenant != address(0), "Invalid tenant address");
        require(_tenant != msg.sender, "Tenant cannot be landlord");
        require(_rentAmount > 0, "Rent must be > 0");
        require(_securityDeposit > 0, "Deposit must be > 0");
        require(_durationMonths > 0, "Duration must be > 0");
        require(_startDate >= block.timestamp, "Start date must be now or future");
        require(_firstDueDate >= _startDate, "First due date must be after start date");

        uint256 contractId = nextContractId;

        agreements[contractId] = RentalAgreement({
            id: contractId,
            landlord: msg.sender,
            tenant: _tenant,
            rentAmount: _rentAmount,
            securityDeposit: _securityDeposit,
            dailyLateFee: _dailyLateFee,
            startDate: _startDate,
            nextDueDate: _firstDueDate,
            durationMonths: _durationMonths,
            monthsPaid: 0,
            totalLatePenaltyPaid: 0,
            damageCost: 0,
            damageDescription: "",
            depositPaid: false,
            depositRefunded: false,
            terminatedByLandlord: false,
            terminatedByTenant: false,
            status: ContractStatus.Active
        });

        landlordContracts[msg.sender].push(contractId);
        tenantContracts[_tenant].push(contractId);

        emit RentalAgreementCreated(
            contractId,
            msg.sender,
            _tenant,
            _rentAmount,
            _securityDeposit,
            _dailyLateFee,
            _startDate,
            _firstDueDate,
            _durationMonths
        );

        nextContractId += 1;
        return contractId;
    }

    function payDeposit(uint256 contractId)
        external
        payable
        agreementExists(contractId)
        onlyTenant(contractId)
        onlyActive(contractId)
    {
        RentalAgreement storage ag = agreements[contractId];

        require(!ag.depositPaid, "Deposit already paid");
        require(msg.value == ag.securityDeposit, "Incorrect deposit amount");

        ag.depositPaid = true;

        emit DepositPaid(contractId, msg.sender, msg.value);
    }

    function getLateDays(uint256 contractId)
        public
        view
        agreementExists(contractId)
        returns (uint256)
    {
        return _calculateLateDays(contractId);
    }

    function getLatePenalty(uint256 contractId)
        public
        view
        agreementExists(contractId)
        returns (uint256)
    {
        return _calculateLatePenalty(contractId);
    }

    function getRentDue(uint256 contractId)
        public
        view
        agreementExists(contractId)
        returns (uint256)
    {
        RentalAgreement storage ag = agreements[contractId];
        return ag.rentAmount + _calculateLatePenalty(contractId);
    }

    function payRent(uint256 contractId)
        external
        payable
        agreementExists(contractId)
        onlyTenant(contractId)
        onlyActive(contractId)
    {
        RentalAgreement storage ag = agreements[contractId];

        require(ag.depositPaid, "Deposit must be paid first");
        require(ag.monthsPaid < ag.durationMonths, "All rent already paid");

        uint256 penalty = _calculateLatePenalty(contractId);
        uint256 totalDue = ag.rentAmount + penalty;

        require(msg.value == totalDue, "Incorrect rent amount");

        ag.monthsPaid += 1;
        ag.totalLatePenaltyPaid += penalty;

        (bool success, ) = payable(ag.landlord).call{value: msg.value}("");
        require(success, "Transfer failed");

        emit RentPaid(
            contractId,
            msg.sender,
            ag.rentAmount,
            penalty,
            msg.value,
            ag.monthsPaid
        );

        if (ag.monthsPaid >= ag.durationMonths) {
            ag.status = ContractStatus.Completed;
        } else {
            ag.nextDueDate += 30 days;
        }
    }

    function terminateByLandlord(uint256 contractId)
        external
        agreementExists(contractId)
        onlyLandlord(contractId)
        onlyActive(contractId)
    {
        RentalAgreement storage ag = agreements[contractId];
        ag.status = ContractStatus.Terminated;
        ag.terminatedByLandlord = true;

        emit ContractTerminatedByLandlord(contractId, msg.sender, block.timestamp);
    }

    function terminateByTenant(uint256 contractId)
        external
        agreementExists(contractId)
        onlyTenant(contractId)
        onlyActive(contractId)
    {
        RentalAgreement storage ag = agreements[contractId];
        ag.status = ContractStatus.Terminated;
        ag.terminatedByTenant = true;

        emit ContractTerminatedByTenant(contractId, msg.sender, block.timestamp);
    }

    function reportDamage(
        uint256 contractId,
        uint256 _damageCost,
        string calldata _damageDescription
    )
        external
        agreementExists(contractId)
        onlyLandlord(contractId)
    {
        RentalAgreement storage ag = agreements[contractId];

        require(_isFinalized(ag), "Contract must be terminated or completed");
        require(_damageCost <= ag.securityDeposit, "Damage exceeds deposit");

        ag.damageCost = _damageCost;
        ag.damageDescription = _damageDescription;

        emit DamageReported(contractId, _damageCost, _damageDescription);
    }

    function refundDeposit(uint256 contractId)
        external
        agreementExists(contractId)
        onlyLandlord(contractId)
    {
        RentalAgreement storage ag = agreements[contractId];

        require(_isFinalized(ag), "Contract must be terminated or completed");
        require(ag.depositPaid, "Deposit not paid");
        require(!ag.depositRefunded, "Deposit already refunded");

        uint256 refundAmount = _calculateRefundAmount(contractId);
        require(address(this).balance >= refundAmount, "Insufficient contract balance");

        ag.depositRefunded = true;

        if (refundAmount > 0) {
            (bool success, ) = payable(ag.tenant).call{value: refundAmount}("");
            require(success, "Refund failed");
        }

        emit DepositRefunded(contractId, ag.tenant, refundAmount);
    }

    function getAgreementDetails(uint256 contractId)
        external
        view
        agreementExists(contractId)
        returns (
            uint256 id,
            address landlord,
            address tenant,
            uint256 rentAmount,
            uint256 securityDeposit,
            uint256 dailyLateFee,
            uint256 startDate,
            uint256 nextDueDate,
            uint256 durationMonths,
            uint256 monthsPaid,
            uint256 totalLatePenaltyPaid,
            uint256 damageCost,
            string memory damageDescription,
            bool depositPaid,
            bool depositRefunded,
            bool terminatedByLandlord,
            bool terminatedByTenant,
            ContractStatus status
        )
    {
        RentalAgreement storage ag = agreements[contractId];

        return (
            ag.id,
            ag.landlord,
            ag.tenant,
            ag.rentAmount,
            ag.securityDeposit,
            ag.dailyLateFee,
            ag.startDate,
            ag.nextDueDate,
            ag.durationMonths,
            ag.monthsPaid,
            ag.totalLatePenaltyPaid,
            ag.damageCost,
            ag.damageDescription,
            ag.depositPaid,
            ag.depositRefunded,
            ag.terminatedByLandlord,
            ag.terminatedByTenant,
            ag.status
        );
    }

    function getLandlordContracts(address landlord)
        external
        view
        returns (uint256[] memory)
    {
        return landlordContracts[landlord];
    }

    function getTenantContracts(address tenant)
        external
        view
        returns (uint256[] memory)
    {
        return tenantContracts[tenant];
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}