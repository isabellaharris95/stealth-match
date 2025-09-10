// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract StealthMatch is SepoliaConfig {
    using FHE for *;
    
    struct JobPosting {
        euint32 jobId;
        euint32 salary;
        euint32 experienceRequired;
        euint32 applicationCount;
        bool isActive;
        bool isVerified;
        string title;
        string description;
        string company;
        string location;
        address employer;
        uint256 postedAt;
        uint256 deadline;
    }
    
    struct CandidateProfile {
        euint32 profileId;
        euint32 expectedSalary;
        euint32 experience;
        euint32 skillScore;
        bool isActive;
        bool isVerified;
        string name;
        string email;
        string skills;
        string resumeHash;
        address candidate;
        uint256 createdAt;
    }
    
    struct Application {
        euint32 applicationId;
        euint32 jobId;
        euint32 profileId;
        euint32 matchScore;
        bool isAccepted;
        bool isRejected;
        address candidate;
        address employer;
        uint256 appliedAt;
    }
    
    struct MatchResult {
        euint32 matchId;
        euint32 jobId;
        euint32 profileId;
        euint32 compatibilityScore;
        bool isMatched;
        address candidate;
        address employer;
        uint256 matchedAt;
    }
    
    mapping(uint256 => JobPosting) public jobPostings;
    mapping(uint256 => CandidateProfile) public candidateProfiles;
    mapping(uint256 => Application) public applications;
    mapping(uint256 => MatchResult) public matchResults;
    mapping(address => euint32) public employerReputation;
    mapping(address => euint32) public candidateReputation;
    
    uint256 public jobCounter;
    uint256 public profileCounter;
    uint256 public applicationCounter;
    uint256 public matchCounter;
    
    address public owner;
    address public verifier;
    
    event JobPosted(uint256 indexed jobId, address indexed employer, string title);
    event ProfileCreated(uint256 indexed profileId, address indexed candidate, string name);
    event ApplicationSubmitted(uint256 indexed applicationId, uint256 indexed jobId, address indexed candidate);
    event MatchFound(uint256 indexed matchId, uint256 indexed jobId, uint256 indexed profileId);
    event JobVerified(uint256 indexed jobId, bool isVerified);
    event ProfileVerified(uint256 indexed profileId, bool isVerified);
    event ReputationUpdated(address indexed user, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function postJob(
        string memory _title,
        string memory _description,
        string memory _company,
        string memory _location,
        uint256 _deadline
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Job title cannot be empty");
        require(_deadline > block.timestamp, "Deadline must be in the future");
        
        uint256 jobId = jobCounter++;
        
        jobPostings[jobId] = JobPosting({
            jobId: FHE.asEuint32(0), // Will be set properly later
            salary: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            experienceRequired: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            applicationCount: FHE.asEuint32(0),
            isActive: true,
            isVerified: false,
            title: _title,
            description: _description,
            company: _company,
            location: _location,
            employer: msg.sender,
            postedAt: block.timestamp,
            deadline: _deadline
        });
        
        emit JobPosted(jobId, msg.sender, _title);
        return jobId;
    }
    
    function setJobDetails(
        uint256 jobId,
        externalEuint32 salary,
        externalEuint32 experienceRequired,
        bytes calldata salaryProof,
        bytes calldata experienceProof
    ) public {
        require(jobPostings[jobId].employer == msg.sender, "Only employer can set job details");
        require(jobPostings[jobId].isActive, "Job must be active");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalSalary = FHE.fromExternal(salary, salaryProof);
        euint32 internalExperience = FHE.fromExternal(experienceRequired, experienceProof);
        
        jobPostings[jobId].salary = internalSalary;
        jobPostings[jobId].experienceRequired = internalExperience;
    }
    
    function createProfile(
        string memory _name,
        string memory _email,
        string memory _skills,
        string memory _resumeHash
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        
        uint256 profileId = profileCounter++;
        
        candidateProfiles[profileId] = CandidateProfile({
            profileId: FHE.asEuint32(0), // Will be set properly later
            expectedSalary: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            experience: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            skillScore: FHE.asEuint32(0), // Will be set to actual value via FHE operations
            isActive: true,
            isVerified: false,
            name: _name,
            email: _email,
            skills: _skills,
            resumeHash: _resumeHash,
            candidate: msg.sender,
            createdAt: block.timestamp
        });
        
        emit ProfileCreated(profileId, msg.sender, _name);
        return profileId;
    }
    
    function setProfileDetails(
        uint256 profileId,
        externalEuint32 expectedSalary,
        externalEuint32 experience,
        externalEuint32 skillScore,
        bytes calldata salaryProof,
        bytes calldata experienceProof,
        bytes calldata skillProof
    ) public {
        require(candidateProfiles[profileId].candidate == msg.sender, "Only candidate can set profile details");
        require(candidateProfiles[profileId].isActive, "Profile must be active");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalSalary = FHE.fromExternal(expectedSalary, salaryProof);
        euint32 internalExperience = FHE.fromExternal(experience, experienceProof);
        euint32 internalSkillScore = FHE.fromExternal(skillScore, skillProof);
        
        candidateProfiles[profileId].expectedSalary = internalSalary;
        candidateProfiles[profileId].experience = internalExperience;
        candidateProfiles[profileId].skillScore = internalSkillScore;
    }
    
    function applyForJob(
        uint256 jobId,
        uint256 profileId,
        externalEuint32 matchScore,
        bytes calldata matchProof
    ) public returns (uint256) {
        require(jobPostings[jobId].employer != address(0), "Job does not exist");
        require(candidateProfiles[profileId].candidate == msg.sender, "Only profile owner can apply");
        require(jobPostings[jobId].isActive, "Job must be active");
        require(candidateProfiles[profileId].isActive, "Profile must be active");
        require(block.timestamp <= jobPostings[jobId].deadline, "Application deadline has passed");
        
        uint256 applicationId = applicationCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalMatchScore = FHE.fromExternal(matchScore, matchProof);
        
        applications[applicationId] = Application({
            applicationId: FHE.asEuint32(0), // Will be set properly later
            jobId: FHE.asEuint32(uint32(jobId)),
            profileId: FHE.asEuint32(uint32(profileId)),
            matchScore: internalMatchScore,
            isAccepted: false,
            isRejected: false,
            candidate: msg.sender,
            employer: jobPostings[jobId].employer,
            appliedAt: block.timestamp
        });
        
        // Update job application count
        jobPostings[jobId].applicationCount = FHE.add(jobPostings[jobId].applicationCount, FHE.asEuint32(1));
        
        emit ApplicationSubmitted(applicationId, jobId, msg.sender);
        return applicationId;
    }
    
    function findMatches(
        uint256 jobId,
        uint256 profileId,
        externalEuint32 compatibilityScore,
        bytes calldata compatibilityProof
    ) public returns (uint256) {
        require(jobPostings[jobId].employer != address(0), "Job does not exist");
        require(candidateProfiles[profileId].candidate != address(0), "Profile does not exist");
        require(msg.sender == verifier, "Only verifier can find matches");
        
        uint256 matchId = matchCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalCompatibilityScore = FHE.fromExternal(compatibilityScore, compatibilityProof);
        
        matchResults[matchId] = MatchResult({
            matchId: FHE.asEuint32(0), // Will be set properly later
            jobId: FHE.asEuint32(uint32(jobId)),
            profileId: FHE.asEuint32(uint32(profileId)),
            compatibilityScore: internalCompatibilityScore,
            isMatched: true,
            candidate: candidateProfiles[profileId].candidate,
            employer: jobPostings[jobId].employer,
            matchedAt: block.timestamp
        });
        
        emit MatchFound(matchId, jobId, profileId);
        return matchId;
    }
    
    function verifyJob(uint256 jobId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify jobs");
        require(jobPostings[jobId].employer != address(0), "Job does not exist");
        
        jobPostings[jobId].isVerified = isVerified;
        emit JobVerified(jobId, isVerified);
    }
    
    function verifyProfile(uint256 profileId, bool isVerified) public {
        require(msg.sender == verifier, "Only verifier can verify profiles");
        require(candidateProfiles[profileId].candidate != address(0), "Profile does not exist");
        
        candidateProfiles[profileId].isVerified = isVerified;
        emit ProfileVerified(profileId, isVerified);
    }
    
    function updateReputation(address user, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(user != address(0), "Invalid user address");
        
        // Determine if user is employer or candidate based on context
        if (jobPostings[jobCounter - 1].employer == user) {
            employerReputation[user] = reputation;
        } else {
            candidateReputation[user] = reputation;
        }
        
        emit ReputationUpdated(user, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getJobInfo(uint256 jobId) public view returns (
        string memory title,
        string memory description,
        string memory company,
        string memory location,
        uint8 salary,
        uint8 experienceRequired,
        uint8 applicationCount,
        bool isActive,
        bool isVerified,
        address employer,
        uint256 postedAt,
        uint256 deadline
    ) {
        JobPosting storage job = jobPostings[jobId];
        return (
            job.title,
            job.description,
            job.company,
            job.location,
            0, // FHE.decrypt(job.salary) - will be decrypted off-chain
            0, // FHE.decrypt(job.experienceRequired) - will be decrypted off-chain
            0, // FHE.decrypt(job.applicationCount) - will be decrypted off-chain
            job.isActive,
            job.isVerified,
            job.employer,
            job.postedAt,
            job.deadline
        );
    }
    
    function getProfileInfo(uint256 profileId) public view returns (
        string memory name,
        string memory email,
        string memory skills,
        string memory resumeHash,
        uint8 expectedSalary,
        uint8 experience,
        uint8 skillScore,
        bool isActive,
        bool isVerified,
        address candidate,
        uint256 createdAt
    ) {
        CandidateProfile storage profile = candidateProfiles[profileId];
        return (
            profile.name,
            profile.email,
            profile.skills,
            profile.resumeHash,
            0, // FHE.decrypt(profile.expectedSalary) - will be decrypted off-chain
            0, // FHE.decrypt(profile.experience) - will be decrypted off-chain
            0, // FHE.decrypt(profile.skillScore) - will be decrypted off-chain
            profile.isActive,
            profile.isVerified,
            profile.candidate,
            profile.createdAt
        );
    }
    
    function getApplicationInfo(uint256 applicationId) public view returns (
        uint8 jobId,
        uint8 profileId,
        uint8 matchScore,
        bool isAccepted,
        bool isRejected,
        address candidate,
        address employer,
        uint256 appliedAt
    ) {
        Application storage application = applications[applicationId];
        return (
            0, // FHE.decrypt(application.jobId) - will be decrypted off-chain
            0, // FHE.decrypt(application.profileId) - will be decrypted off-chain
            0, // FHE.decrypt(application.matchScore) - will be decrypted off-chain
            application.isAccepted,
            application.isRejected,
            application.candidate,
            application.employer,
            application.appliedAt
        );
    }
    
    function getMatchInfo(uint256 matchId) public view returns (
        uint8 jobId,
        uint8 profileId,
        uint8 compatibilityScore,
        bool isMatched,
        address candidate,
        address employer,
        uint256 matchedAt
    ) {
        MatchResult storage matchResult = matchResults[matchId];
        return (
            0, // FHE.decrypt(matchResult.jobId) - will be decrypted off-chain
            0, // FHE.decrypt(matchResult.profileId) - will be decrypted off-chain
            0, // FHE.decrypt(matchResult.compatibilityScore) - will be decrypted off-chain
            matchResult.isMatched,
            matchResult.candidate,
            matchResult.employer,
            matchResult.matchedAt
        );
    }
    
    function getEmployerReputation(address employer) public view returns (uint8) {
        return 0; // FHE.decrypt(employerReputation[employer]) - will be decrypted off-chain
    }
    
    function getCandidateReputation(address candidate) public view returns (uint8) {
        return 0; // FHE.decrypt(candidateReputation[candidate]) - will be decrypted off-chain
    }
    
    function acceptApplication(uint256 applicationId) public {
        Application storage application = applications[applicationId];
        require(application.employer == msg.sender, "Only employer can accept application");
        require(!application.isAccepted && !application.isRejected, "Application already processed");
        
        application.isAccepted = true;
    }
    
    function rejectApplication(uint256 applicationId) public {
        Application storage application = applications[applicationId];
        require(application.employer == msg.sender, "Only employer can reject application");
        require(!application.isAccepted && !application.isRejected, "Application already processed");
        
        application.isRejected = true;
    }
}
