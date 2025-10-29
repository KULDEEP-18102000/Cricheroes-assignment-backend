import { describe, test, expect } from '@jest/globals';
import { calculateNewNRR, updateTeamAfterMatch } from '../src/services/nrrCalculator.js';
import { calculateRequiredPerformance } from '../src/services/positionFinder.js';
import { initialPointsTable } from '../src/models/PointsTable.js';

describe('NRR Calculator Tests', () => {
  
  test('Calculate new NRR correctly', () => {
    const team = initialPointsTable[3]; // Rajasthan Royals
    const newNRR = calculateNewNRR(team, 120, 20, 100, 20);
    expect(newNRR).toBeDefined();
    expect(typeof newNRR).toBe('number');
  });
  
  test('Update team after match - Win scenario', () => {
    const team = { ...initialPointsTable[3] }; // Rajasthan Royals
    const updated = updateTeamAfterMatch(team, 120, 20, 100, 20, true);
    
    expect(updated.matches).toBe(team.matches + 1);
    expect(updated.won).toBe(team.won + 1);
    expect(updated.points).toBe(team.points + 2);
  });
  
  test('Q1a: Rajasthan Royals vs Delhi Capitals - Batting First', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Delhi Capitals',
      3,
      'batting',
      120,
      20
    );
    
    expect(result).toBeDefined();
    expect(result.minRuns).toBeDefined();
    expect(result.maxRuns).toBeDefined();
  });
  
  test('Q1b: Rajasthan Royals vs Delhi Capitals - Bowling First', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Delhi Capitals',
      3,
      'bowling',
      119,
      20
    );
    
    expect(result).toBeDefined();
    expect(result.minOvers).toBeDefined();
    expect(result.maxOvers).toBeDefined();
  });
  
  test('Q2c: Rajasthan Royals vs RCB - Batting First', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Royal Challengers Bangalore',
      3,
      'batting',
      80,
      20
    );
    
    expect(result).toBeDefined();
    // Should return a range
  });
  
  test('Q2d: Rajasthan Royals vs RCB - Bowling First', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Royal Challengers Bangalore',
      3,
      'bowling',
      79,
      20
    );
    
    expect(result).toBeDefined();
    // Should return a range
  });
});