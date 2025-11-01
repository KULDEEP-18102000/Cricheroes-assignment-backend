import { parseRunsOvers, formatRunsOvers } from "../models/PointsTable.js";
import { oversToDecimal, decimalToOvers } from "../utils/tableOperations.js";

/**
 * Update team statistics after a match result
 * @param {Object} team - Team object
 * @param {number} runsScored - Runs scored by team
 * @param {number} oversPlayed - Overs played by team
 * @param {number} runsConceded - Runs conceded by team
 * @param {number} oversBowled - Overs bowled by team
 * @param {boolean} won - Whether team won the match
 * @returns {Object} Updated team object
 */
export function updateTeamAfterMatch(
  team,
  runsScored,
  oversPlayed,
  runsConceded,
  oversBowled,
  won
) {
  const forData = parseRunsOvers(team.for);
  const againstData = parseRunsOvers(team.against);

  // Convert overs to decimal for calculation
  const currentForOvers = oversToDecimal(forData.overs);
  const currentAgainstOvers = oversToDecimal(againstData.overs);
  const playedOversDecimal = oversToDecimal(oversPlayed);
  const bowledOversDecimal = oversToDecimal(oversBowled);

  // Update cumulative stats
  const newForRuns = forData.runs + runsScored;
  const newForOvers = currentForOvers + playedOversDecimal;
  const newAgainstRuns = againstData.runs + runsConceded;
  const newAgainstOvers = currentAgainstOvers + bowledOversDecimal;

  // Calculate new NRR
  const newNRR = newForRuns / newForOvers - newAgainstRuns / newAgainstOvers;

  // Convert back to cricket format
  const newForOversFormatted = decimalToOvers(newForOvers);
  const newAgainstOversFormatted = decimalToOvers(newAgainstOvers);

  return {
    ...team,
    matches: team.matches + 1,
    won: team.won + (won ? 1 : 0),
    lost: team.lost + (won ? 0 : 1),
    nrr: parseFloat(newNRR.toFixed(3)),
    for: formatRunsOvers(newForRuns, newForOversFormatted),
    against: formatRunsOvers(newAgainstRuns, newAgainstOversFormatted),
    points: team.points + (won ? 2 : 0),
  };
}

/**
 * Calculate what the new NRR would be after a match
 */
export function calculateNewNRR(
  team,
  runsScored,
  oversPlayed,
  runsConceded,
  oversBowled
) {
  const forData = parseRunsOvers(team.for);
  const againstData = parseRunsOvers(team.against);

  const currentForOvers = oversToDecimal(forData.overs);
  const currentAgainstOvers = oversToDecimal(againstData.overs);
  const playedOversDecimal = oversToDecimal(oversPlayed);
  const bowledOversDecimal = oversToDecimal(oversBowled);

  const newForRuns = forData.runs + runsScored;
  const newForOvers = currentForOvers + playedOversDecimal;
  const newAgainstRuns = againstData.runs + runsConceded;
  const newAgainstOvers = currentAgainstOvers + bowledOversDecimal;

  const newNRR = newForRuns / newForOvers - newAgainstRuns / newAgainstOvers;

  return parseFloat(newNRR.toFixed(3));
}
