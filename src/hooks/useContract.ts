import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, formatEther } from 'viem';

// Contract ABI - you'll need to update this with the actual ABI after deployment
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "address", "name": "_verifier", "type": "address"}
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "jobId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "employer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "title", "type": "string"}
    ],
    "name": "JobPosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "profileId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "candidate", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"}
    ],
    "name": "ProfileCreated",
    "type": "event"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "string", "name": "_company", "type": "string"},
      {"internalType": "string", "name": "_location", "type": "string"},
      {"internalType": "uint256", "name": "_deadline", "type": "uint256"}
    ],
    "name": "postJob",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "_name", "type": "string"},
      {"internalType": "string", "name": "_email", "type": "string"},
      {"internalType": "string", "name": "_skills", "type": "string"},
      {"internalType": "string", "name": "_resumeHash", "type": "string"}
    ],
    "name": "createProfile",
    "outputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "jobId", "type": "uint256"}
    ],
    "name": "getJobInfo",
    "outputs": [
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "company", "type": "string"},
      {"internalType": "string", "name": "location", "type": "string"},
      {"internalType": "uint8", "name": "salary", "type": "uint8"},
      {"internalType": "uint8", "name": "experienceRequired", "type": "uint8"},
      {"internalType": "uint8", "name": "applicationCount", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "employer", "type": "address"},
      {"internalType": "uint256", "name": "postedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "deadline", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "profileId", "type": "uint256"}
    ],
    "name": "getProfileInfo",
    "outputs": [
      {"internalType": "string", "name": "name", "type": "string"},
      {"internalType": "string", "name": "email", "type": "string"},
      {"internalType": "string", "name": "skills", "type": "string"},
      {"internalType": "string", "name": "resumeHash", "type": "string"},
      {"internalType": "uint8", "name": "expectedSalary", "type": "uint8"},
      {"internalType": "uint8", "name": "experience", "type": "uint8"},
      {"internalType": "uint8", "name": "skillScore", "type": "uint8"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"},
      {"internalType": "address", "name": "candidate", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Contract address - update this after deployment
const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";

export const useStealthMatch = () => {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const postJob = async (
    title: string,
    description: string,
    company: string,
    location: string,
    deadline: number
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'postJob',
        args: [title, description, company, location, BigInt(deadline)],
      });
    } catch (err) {
      console.error('Error posting job:', err);
      throw err;
    }
  };

  const createProfile = async (
    name: string,
    email: string,
    skills: string,
    resumeHash: string
  ) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: CONTRACT_ABI,
        functionName: 'createProfile',
        args: [name, email, skills, resumeHash],
      });
    } catch (err) {
      console.error('Error creating profile:', err);
      throw err;
    }
  };

  return {
    postJob,
    createProfile,
    isPending,
    isConfirming,
    isConfirmed,
    error,
    hash,
  };
};

export const useJobInfo = (jobId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getJobInfo',
    args: [BigInt(jobId)],
  });

  return {
    jobInfo: data,
    isLoading,
    error,
  };
};

export const useProfileInfo = (profileId: number) => {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getProfileInfo',
    args: [BigInt(profileId)],
  });

  return {
    profileInfo: data,
    isLoading,
    error,
  };
};
