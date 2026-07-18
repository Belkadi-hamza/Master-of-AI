import { ethers } from "ethers";
import RentalManagerABI from "../abi/RentalManager.json";

// Support both local Truffle and Sepolia testnet
const NETWORKS = {
  truffle: {
    chainId: 5777,
    rpcUrl: "http://127.0.0.1:9545",
    contractAddress: "0xe2b7fB50e470d17435522ddB1fe07EaFD0e5C046",
  },
  sepolia: {
    chainId: 11155111,
    rpcUrl: import.meta.env.VITE_RPC_URL || "https://sepolia.infura.io/v3/YOUR_KEY",
    contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || "0x",
  },
};

// Determine which network to use
const NETWORK = import.meta.env.VITE_CHAIN_ID === "11155111" ? NETWORKS.sepolia : NETWORKS.truffle;
export const CONTRACT_ADDRESS = NETWORK.contractAddress;
export const CHAIN_ID = NETWORK.chainId;
export const RPC_URL = NETWORK.rpcUrl;
export const CONTRACT_ABI = RentalManagerABI;

export interface ContractData {
  id: string;
  landlord: string;
  tenant: string;
  rentAmount: string;
  securityDeposit: string;
  dailyLateFee: string;
  startDate: number;
  nextDueDate: number;
  durationMonths: number;
  monthsPaid: number;
}

declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider & {
      on?: (event: string, callback: (...args: unknown[]) => void) => void;
      removeListener?: (event: string, callback: (...args: unknown[]) => void) => void;
    };
  }
}

export async function connectWallet(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
  }

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return accounts[0] as string;
}

export async function switchToTruffleDevelop(): Promise<void> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
    });
  } catch (error) {
    const networkName = CHAIN_ID === 11155111 ? "Sepolia Testnet" : "Truffle Develop";
    throw new Error(`Please switch to ${networkName} (Chain ID: ${CHAIN_ID})`);
  }
}

export async function getContractInstance(): Promise<ethers.Contract> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export async function getContractData(contractId: number = 1): Promise<ContractData> {
  try {
    return await getAgreementDetails(contractId);
  } catch (error) {
    console.error("Error fetching contract data:", error);
    throw error;
  }
}

export async function getAgreementDetails(contractId: number): Promise<ContractData> {
  const contract = await getContractInstance();
  try {
    const details = await contract.getAgreementDetails(contractId);
    return {
      id: details[0].toString(),
      landlord: details[1],
      tenant: details[2],
      rentAmount: ethers.formatEther(details[3]),
      securityDeposit: ethers.formatEther(details[4]),
      dailyLateFee: ethers.formatEther(details[5]),
      startDate: Number(details[6]),
      nextDueDate: Number(details[7]),
      durationMonths: Number(details[8]),
      monthsPaid: Number(details[9]),
    };
  } catch (error) {
    console.error("Error fetching agreement details:", error);
    throw error;
  }
}

export async function payDeposit(contractId: number, amount: string): Promise<string> {
  const contract = await getContractInstance();
  try {
    const tx = await contract.payDeposit(contractId, {
      value: ethers.parseEther(amount),
    });
    return tx.hash;
  } catch (error) {
    console.error("Error paying deposit:", error);
    throw error;
  }
}

export async function payRent(contractId: number, amount: string): Promise<string> {
  const contract = await getContractInstance();
  try {
    const tx = await contract.payRent(contractId, {
      value: ethers.parseEther(amount),
    });
    return tx.hash;
  } catch (error) {
    console.error("Error paying rent:", error);
    throw error;
  }
}

export async function getRentDue(contractId: number): Promise<string> {
  const contract = await getContractInstance();
  try {
    const rentDue = await contract.getRentDue(contractId);
    return ethers.formatEther(rentDue);
  } catch (error) {
    console.error("Error getting rent due:", error);
    throw error;
  }
}

export async function getLateDays(contractId: number): Promise<number> {
  const contract = await getContractInstance();
  try {
    const lateDays = await contract.getLateDays(contractId);
    return Number(lateDays);
  } catch (error) {
    console.error("Error getting late days:", error);
    throw error;
  }
}

export async function getLatePenalty(contractId: number): Promise<string> {
  const contract = await getContractInstance();
  try {
    const penalty = await contract.getLatePenalty(contractId);
    return ethers.formatEther(penalty);
  } catch (error) {
    console.error("Error getting late penalty:", error);
    throw error;
  }
}

export async function terminateByLandlord(contractId: number): Promise<string> {
  const contract = await getContractInstance();
  try {
    const tx = await contract.terminateByLandlord(contractId);
    return tx.hash;
  } catch (error) {
    console.error("Error terminating contract:", error);
    throw error;
  }
}

export async function terminateByTenant(contractId: number): Promise<string> {
  const contract = await getContractInstance();
  try {
    const tx = await contract.terminateByTenant(contractId);
    return tx.hash;
  } catch (error) {
    console.error("Error terminating contract:", error);
    throw error;
  }
}

export async function refundDeposit(contractId: number): Promise<string> {
  const contract = await getContractInstance();
  try {
    const tx = await contract.refundDeposit(contractId);
    return tx.hash;
  } catch (error) {
    console.error("Error refunding deposit:", error);
    throw error;
  }
}

export async function createRentalAgreement(
  tenant: string,
  rentAmount: string,
  securityDeposit: string,
  dailyLateFee: string,
  startDate: number,
  firstDueDate: number,
  durationMonths: number
): Promise<string> {
  const contract = await getContractInstance();
  try {
    const tx = await contract.createRentalAgreement(
      tenant,
      ethers.parseEther(rentAmount),
      ethers.parseEther(securityDeposit),
      ethers.parseEther(dailyLateFee),
      startDate,
      firstDueDate,
      durationMonths
    );
    const receipt = await tx.wait();
    return receipt?.transactionHash || tx.hash;
  } catch (error) {
    console.error("Error creating rental agreement:", error);
    throw error;
  }
}

export async function getLandlordContracts(landlordAddress: string): Promise<number[]> {
  const contract = await getContractInstance();
  try {
    const contractIds = await contract.getLandlordContracts(landlordAddress);
    return contractIds.map((id: bigint) => Number(id));
  } catch (error) {
    console.error("Error getting landlord contracts:", error);
    throw error;
  }
}

export async function getTenantContracts(tenantAddress: string): Promise<number[]> {
  const contract = await getContractInstance();
  try {
    const contractIds = await contract.getTenantContracts(tenantAddress);
    return contractIds.map((id: bigint) => Number(id));
  } catch (error) {
    console.error("Error getting tenant contracts:", error);
    throw error;
  }
}
