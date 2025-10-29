/**
 * Initial IPL 2022 Points Table Data
 * This represents the league stage standings
 */
export const initialPointsTable = [
  {
    name: "Chennai Super Kings",
    matches: 7,
    won: 5,
    lost: 2,
    nrr: 0.771,
    for: "1130/133.1",
    against: "1071/138.5",
    points: 10
  },
  {
    name: "Royal Challengers Bangalore",
    matches: 7,
    won: 4,
    lost: 3,
    nrr: 0.597,
    for: "1217/140",
    against: "1066/131.4",
    points: 8
  },
  {
    name: "Delhi Capitals",
    matches: 7,
    won: 4,
    lost: 3,
    nrr: 0.319,
    for: "1085/126",
    against: "1136/137",
    points: 8
  },
  {
    name: "Rajasthan Royals",
    matches: 7,
    won: 3,
    lost: 4,
    nrr: 0.331,
    for: "1066/128.2",
    against: "1094/137.1",
    points: 6
  },
  {
    name: "Mumbai Indians",
    matches: 8,
    won: 2,
    lost: 6,
    nrr: -1.75,
    for: "1003/155.2",
    against: "1134/138.1",
    points: 4
  }
];

/**
 * Parse runs and overs from string format
 * Example: "1130/133.1" -> { runs: 1130, overs: 133.1 }
 */
export function parseRunsOvers(str) {
  const [runs, overs] = str.split('/');
  return {
    runs: parseInt(runs),
    overs: parseFloat(overs)
  };
}

/**
 * Format runs and overs to string
 * Example: { runs: 1130, overs: 133.1 } -> "1130/133.1"
 */
export function formatRunsOvers(runs, overs) {
  return `${runs}/${overs}`;
}

/**
 * Create a deep copy of the points table
 */
export function clonePointsTable(table) {
  return JSON.parse(JSON.stringify(table));
}