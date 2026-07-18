// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract RentalContract {
    address public owner;
    address public tenant;

    uint256 public rentAmount;
    uint256 public securityDeposit;
    uint256 public latePenalty;
    uint256 public nextDueDate;
    uint256 public durationMonths;
    uint256 public monthsPaid;

    bool public isActive;
    bool public depositPaid;
    bool public depositRefunded;

    event ContractCreated(
        address indexed owner,
        address indexed tenant,
        uint256 rentAmount,
        uint256 securityDeposit,
        uint256 latePenalty,
        uint256 firstDueDate,
        uint256 durationMonths
    );

    event DepositPaid(address indexed tenant, uint256 amount);
    event RentPaid(
        address indexed tenant,
        uint256 amountPaid,
        uint256 monthNumber,
        bool wasLate
    );
    event ContractTerminated(address indexed terminatedBy, uint256 timestamp);
    event DepositRefunded(address indexed tenant, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyTenant() {
        require(msg.sender == tenant, "Only tenant can call this function");
        _;
    }

    modifier contractActive() {
        require(isActive, "Contract is not active");
        _;
    }

    constructor(
        address _tenant,
        uint256 _rentAmount,
        uint256 _securityDeposit,
        uint256 _latePenalty,
        uint256 _firstDueDate,
        uint256 _durationMonths
    ) {
        require(_tenant != address(0), "Invalid tenant address");
        require(_rentAmount > 0, "Rent amount must be > 0");
        require(_securityDeposit > 0, "Security deposit must be > 0");
        require(_durationMonths > 0, "Duration must be > 0");
        require(_firstDueDate > block.timestamp, "First due date must be in future");

        owner = msg.sender;
        tenant = _tenant;
        rentAmount = _rentAmount;
        securityDeposit = _securityDeposit;
        latePenalty = _latePenalty;
        nextDueDate = _firstDueDate;
        durationMonths = _durationMonths;

        isActive = true;
        depositPaid = false;
        depositRefunded = false;
        monthsPaid = 0;

        emit ContractCreated(
            owner,
            tenant,
            rentAmount,
            securityDeposit,
            latePenalty,
            nextDueDate,
            durationMonths
        );
    }

    function payDeposit() external payable onlyTenant contractActive {
        require(!depositPaid, "Deposit already paid");
        require(msg.value == securityDeposit, "Incorrect deposit amount");

        depositPaid = true;

        emit DepositPaid(msg.sender, msg.value);
    }

    function isLatePayment() public view returns (bool) {
        return block.timestamp > nextDueDate;
    }

    function getRentDue() public view returns (uint256) {
        if (isLatePayment()) {
            return rentAmount + latePenalty;
        }
        return rentAmount;
    }

    function payRent() external payable onlyTenant contractActive {
        require(depositPaid, "Deposit must be paid first");
        require(monthsPaid < durationMonths, "All rent payments completed");

        uint256 amountDue = getRentDue();
        bool wasLate = isLatePayment();

        require(msg.value == amountDue, "Incorrect rent amount");

        monthsPaid += 1;

        (bool success, ) = payable(owner).call{value: msg.value}("");
        require(success, "Transfer to owner failed");

        emit RentPaid(msg.sender, msg.value, monthsPaid, wasLate);

        if (monthsPaid >= durationMonths) {
            isActive = false;
            emit ContractTerminated(msg.sender, block.timestamp);
        } else {
            nextDueDate += 30 days;
        }
    }

    function terminateContract() external onlyOwner contractActive {
        isActive = false;
        emit ContractTerminated(msg.sender, block.timestamp);
    }

    function refundDeposit() external onlyOwner {
        require(!isActive, "Contract is still active");
        require(depositPaid, "Deposit was not paid");
        require(!depositRefunded, "Deposit already refunded");
        require(address(this).balance >= securityDeposit, "Insufficient contract balance");

        depositRefunded = true;

        (bool success, ) = payable(tenant).call{value: securityDeposit}("");
        require(success, "Refund failed");

        emit DepositRefunded(tenant, securityDeposit);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getContractDetails()
        external
        view
        returns (
            address _owner,
            address _tenant,
            uint256 _rentAmount,
            uint256 _securityDeposit,
            uint256 _latePenalty,
            uint256 _nextDueDate,
            uint256 _durationMonths,
            uint256 _monthsPaid,
            bool _isActive,
            bool _depositPaid,
            bool _depositRefunded
        )
    {
        return (
            owner,
            tenant,
            rentAmount,
            securityDeposit,
            latePenalty,
            nextDueDate,
            durationMonths,
            monthsPaid,
            isActive,
            depositPaid,
            depositRefunded
        );
    }

    receive() external payable {}
}