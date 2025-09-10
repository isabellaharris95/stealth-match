import { expect } from "chai";
import { ethers } from "hardhat";

describe("StealthMatch", function () {
  let stealthMatch: any;
  let owner: any;
  let verifier: any;
  let employer: any;
  let candidate: any;

  beforeEach(async function () {
    [owner, verifier, employer, candidate] = await ethers.getSigners();

    const StealthMatch = await ethers.getContractFactory("StealthMatch");
    stealthMatch = await StealthMatch.deploy(verifier.address);
    await stealthMatch.waitForDeployment();
  });

  it("Should deploy with correct verifier", async function () {
    expect(await stealthMatch.verifier()).to.equal(verifier.address);
  });

  it("Should allow posting a job", async function () {
    const tx = await stealthMatch.connect(employer).postJob(
      "Software Engineer",
      "Full-stack development role",
      "Tech Corp",
      "San Francisco, CA",
      Math.floor(Date.now() / 1000) + 86400 // 1 day from now
    );
    
    await expect(tx)
      .to.emit(stealthMatch, "JobPosted")
      .withArgs(0, employer.address, "Software Engineer");
  });

  it("Should allow creating a candidate profile", async function () {
    const tx = await stealthMatch.connect(candidate).createProfile(
      "John Doe",
      "john@example.com",
      "React, Node.js, TypeScript",
      "resume_hash_123"
    );
    
    await expect(tx)
      .to.emit(stealthMatch, "ProfileCreated")
      .withArgs(0, candidate.address, "John Doe");
  });

  it("Should only allow verifier to verify jobs", async function () {
    // First post a job
    await stealthMatch.connect(employer).postJob(
      "Software Engineer",
      "Full-stack development role",
      "Tech Corp",
      "San Francisco, CA",
      Math.floor(Date.now() / 1000) + 86400
    );

    // Only verifier should be able to verify
    await expect(
      stealthMatch.connect(verifier).verifyJob(0, true)
    ).to.not.be.reverted;

    await expect(
      stealthMatch.connect(employer).verifyJob(0, true)
    ).to.be.revertedWith("Only verifier can verify jobs");
  });
});
