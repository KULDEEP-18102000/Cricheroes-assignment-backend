import { clonePointsTable } from "../models/PointsTable.js";
import { updateTeamAfterMatch } from "./nrrCalculator.js";
import { sortPointsTable, getTeamPosition } from "../utils/tableOperations.js";

/**
 * Simulate a match and return the updated points table with team positions
 */
function simulateMatch(
  table,
  yourTeamName,
  oppTeamName,
  yourRuns,
  yourOvers,
  oppRuns,
  oppOvers
) {
  const updatedTable = clonePointsTable(table);

  const yourTeam = updatedTable.find((t) => t.name === yourTeamName);
  const oppTeam = updatedTable.find((t) => t.name === oppTeamName);

  if (!yourTeam || !oppTeam) {
    throw new Error("Team not found");
  }

  // Determine winner
  const yourTeamWon = yourRuns > oppRuns;

  // Update both teams
  const updatedYourTeam = updateTeamAfterMatch(
    yourTeam,
    yourRuns,
    yourOvers,
    oppRuns,
    oppOvers,
    yourTeamWon
  );
  const updatedOppTeam = updateTeamAfterMatch(
    oppTeam,
    oppRuns,
    oppOvers,
    yourRuns,
    yourOvers,
    !yourTeamWon
  );

  // Replace in table
  const yourIndex = updatedTable.findIndex((t) => t.name === yourTeamName);
  const oppIndex = updatedTable.findIndex((t) => t.name === oppTeamName);

  updatedTable[yourIndex] = updatedYourTeam;
  updatedTable[oppIndex] = updatedOppTeam;

  return updatedTable;
}

/**
 * Find the range of runs opponent can score for your team to reach desired position
 * (Batting First scenario)
 */
export function findRunsToRestrict(
  table,
  yourTeamName,
  oppTeamName,
  desiredPosition,
  runsScored,
  overs
) {
  let minRuns = 0;
  let maxRuns = runsScored - 1; // Must restrict to less than your score

  let validMin = null;
  let validMax = null;
  let minNRR = null;
  let maxNRR = null;

  // Try each possible run value
  for (let runs = minRuns; runs <= maxRuns; runs++) {
    const simulatedTable = simulateMatch(
      table,
      yourTeamName,
      oppTeamName,
      runsScored,
      overs,
      runs,
      overs
    );

    const position = getTeamPosition(simulatedTable, yourTeamName);
    const yourTeam = simulatedTable.find((t) => t.name === yourTeamName);

    if (position <= desiredPosition) {
      if (validMin === null) {
        validMin = runs;
        minNRR = yourTeam.nrr;
      }
      validMax = runs;
      maxNRR = yourTeam.nrr;
    }
  }

  return {
    minRuns: validMin,
    maxRuns: validMax,
    minNRR: minNRR,
    maxNRR: maxNRR,
  };
}

/**
 * Find the range of overs to chase the target for your team to reach desired position
 * (Bowling First scenario)
 */
export function findOversToChase(
  table,
  yourTeamName,
  oppTeamName,
  desiredPosition,
  runsToChase,
  totalOvers
) {
  let minOvers = 0.1;
  let maxOvers = totalOvers;

  let validMin = null;
  let validMax = null;
  let minNRR = null;
  let maxNRR = null;

  // Try different over values with precision of 0.1
  for (let overs = minOvers; overs <= maxOvers; overs += 0.1) {
    const simulatedTable = simulateMatch(
      table,
      yourTeamName,
      oppTeamName,
      runsToChase,
      overs,
      runsToChase - 1,
      totalOvers
    );

    const position = getTeamPosition(simulatedTable, yourTeamName);
    const yourTeam = simulatedTable.find((t) => t.name === yourTeamName);

    if (position <= desiredPosition) {
      if (validMin === null) {
        validMin = overs;
        minNRR = yourTeam.nrr;
      }
      validMax = overs;
      maxNRR = yourTeam.nrr;
    }
  }

  return {
    minOvers: validMin ? parseFloat(validMin.toFixed(1)) : null,
    maxOvers: validMax ? parseFloat(validMax.toFixed(1)) : null,
    minNRR: minNRR,
    maxNRR: maxNRR,
  };
}

/**
 * Main function to calculate required performance based on scenario
 */
export function calculateRequiredPerformance(
  table,
  yourTeamName,
  oppTeamName,
  desiredPosition,
  tossResult,
  runs,
  overs
) {
  if (tossResult === "batting") {
    // Batting first: find runs to restrict
    return findRunsToRestrict(
      table,
      yourTeamName,
      oppTeamName,
      desiredPosition,
      runs,
      overs
    );
  } else {
    // Bowling first: find overs to chase in
    return findOversToChase(
      table,
      yourTeamName,
      oppTeamName,
      desiredPosition,
      runs,
      overs
    );
  }
}
