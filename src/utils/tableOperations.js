import { parseRunsOvers } from '../models/PointsTable.js';

/**
 * Convert overs in format "20.3" to decimal (20.5)
 * In cricket: 20.3 means 20 overs and 3 balls = 20 + 3/6 = 20.5 overs
 */
export function oversToDecimal(oversStr) {
  const overs = parseFloat(oversStr);
  const completeOvers = Math.floor(overs);
  const balls = Math.round((overs - completeOvers) * 10);
  return completeOvers + balls / 6;
}

/**
 * Convert decimal overs to cricket format
 * Example: 20.5 -> 20.3 (20 overs 3 balls)
 */
export function decimalToOvers(decimal) {
  const completeOvers = Math.floor(decimal);
  const remainingDecimal = decimal - completeOvers;
  const balls = Math.round(remainingDecimal * 6);
  return parseFloat(`${completeOvers}.${balls}`);
}

/**
 * Calculate NRR from team's for and against stats
 */
export function calculateTeamNRR(forStr, againstStr) {
  const forData = parseRunsOvers(forStr);
  const againstData = parseRunsOvers(againstStr);
  
  const forOvers = oversToDecimal(forData.overs);
  const againstOvers = oversToDecimal(againstData.overs);
  
  const runRate = forData.runs / forOvers;
  const concededRate = againstData.runs / againstOvers;
  
  return runRate - concededRate;
}

/**
 * Sort points table by points (desc) then NRR (desc)
 */
export function sortPointsTable(table) {
  return [...table].sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    return b.nrr - a.nrr;
  });
}

/**
 * Get team's position in the sorted table
 */
export function getTeamPosition(table, teamName) {
  const sorted = sortPointsTable(table);
  return sorted.findIndex(team => team.name === teamName) + 1;
}

/**
 * Find team in table by name
 */
export function findTeam(table, teamName) {
  return table.find(team => team.name === teamName);
}