import { describe, test, expect } from '@jest/globals';
import { calculateNewNRR, updateTeamAfterMatch } from '../src/services/nrrCalculator.js';
import { calculateRequiredPerformance } from '../src/services/positionFinder.js';
import { initialPointsTable } from '../src/models/PointsTable.js';
import { sortPointsTable } from '../src/utils/tableOperations.js';
import { oversToDecimal, decimalToOvers } from '../src/utils/tableOperations.js';

describe('NRR Calculator Tests', () => {
  
  // ==================== UNIT TESTS ====================
  
  test('Calculate new NRR correctly - Basic calculation', () => {
    const team = initialPointsTable[3]; // Rajasthan Royals
    const newNRR = calculateNewNRR(team, 120, 20, 100, 20);
    
    console.log('New NRR calculated:', newNRR);
    
    expect(newNRR).toBeDefined();
    expect(typeof newNRR).toBe('number');
    
    expect(newNRR).toBeGreaterThan(team.nrr);
    
    expect(newNRR).toBeGreaterThan(0.3);
    expect(newNRR).toBeLessThan(1.0);
  });
  
  test('Update team after match - Win scenario with exact values', () => {
    const team = { ...initialPointsTable[3] }; // Rajasthan Royals
    const updated = updateTeamAfterMatch(team, 120, 20, 100, 20, true);
    
    // Verify exact increments
    expect(updated.matches).toBe(8); 
    expect(updated.won).toBe(4);
    expect(updated.lost).toBe(4);
    expect(updated.points).toBe(8);
    expect(updated.nrr).toBeGreaterThan(team.nrr);
  });
  
  test('Update team after match - Loss scenario', () => {
    const team = { ...initialPointsTable[3] }; // Rajasthan Royals
    const updated = updateTeamAfterMatch(team, 100, 20, 120, 20, false);
    
    expect(updated.matches).toBe(8);
    expect(updated.won).toBe(3); 
    expect(updated.lost).toBe(5);
    expect(updated.points).toBe(6);
    expect(updated.nrr).toBeLessThan(team.nrr);
  });
  
  // ==================== PROBLEM TEST CASES ====================
  
  test('Q1a: RR vs DC - Batting First (120 runs in 20 overs)', () => {
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
    expect(result.maxRuns).toBeLessThan(120);
    
    expect(result.minRuns).toBeGreaterThanOrEqual(0);
    expect(result.minRuns).toBeLessThanOrEqual(result.maxRuns);
    
    expect(result.minNRR).toBeDefined();
    expect(result.maxNRR).toBeDefined();
  });
  
  test('Q1b: RR vs DC - Bowling First (chase 119 runs)', () => {
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
    
    expect(result.maxOvers).toBeLessThanOrEqual(20);
    
    expect(result.minOvers).toBeGreaterThan(0);
    expect(result.minOvers).toBeLessThanOrEqual(result.maxOvers);
    
    expect(result.minNRR).toBeDefined();
    expect(result.maxNRR).toBeDefined();
  });
  
  test('Q2c: RR vs RCB - Batting First (80 runs in 20 overs)', () => {
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
    
    if (result.minRuns !== null && result.maxRuns !== null) {
      expect(result.maxRuns).toBeLessThan(80);
      expect(result.minRuns).toBeGreaterThanOrEqual(0);
      expect(result.minRuns).toBeLessThanOrEqual(result.maxRuns);
      
      expect(result.minNRR).toBeDefined();
      expect(result.maxNRR).toBeDefined();
      
      console.log(`✓ Restrict RCB between ${result.minRuns} and ${result.maxRuns} runs`);
      console.log(`✓ NRR will range from ${result.minNRR?.toFixed(3)} to ${result.maxNRR?.toFixed(3)}`);
    } else {
      console.log('✗ Not possible to reach position 3 with this scenario');
      expect(result.minRuns).toBeNull();
      expect(result.maxRuns).toBeNull();
    }
  });
  
  test('Q2d: RR vs RCB - Bowling First (chase 79 runs)', () => {
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
    
    if (result.minOvers !== null && result.maxOvers !== null) {
      expect(result.maxOvers).toBeLessThanOrEqual(20);
      expect(result.minOvers).toBeGreaterThan(0);
      expect(result.minOvers).toBeLessThanOrEqual(result.maxOvers);
      
      expect(result.minNRR).toBeDefined();
      expect(result.maxNRR).toBeDefined();
      
    } else {
      expect(result.minOvers).toBeNull();
      expect(result.maxOvers).toBeNull();
    }
  });
  
  
  test('Edge Case: Impossible scenario - want position 1 from position 4', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Delhi Capitals',
      1,
      'batting',
      200,
      20
    );
    
    expect(result.minRuns).toBeNull();
    expect(result.maxRuns).toBeNull();
  });
  
  test('Edge Case: Already at desired position', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Chennai Super Kings',
      'Mumbai Indians',
      1,
      'batting',
      150,
      20
    );
    
    expect(result).toBeDefined();
  });
  
  test('Verify NRR calculation formula', () => {
    const team = {
      name: "Test Team",
      matches: 1,
      won: 0,
      lost: 1,
      nrr: 0,
      for: "150/20",
      against: "120/20",
      points: 0
    };
    
    const newNRR = calculateNewNRR(team, 180, 20, 150, 20);
    
    expect(newNRR).toBeCloseTo(1.5, 2);
  });
});


describe('NRR Calculation Validation', () => {
  
  test('Verify points table sorting logic', () => {
    
    const sorted = sortPointsTable(initialPointsTable);
    
    sorted.forEach((team, index) => {
      console.log(`${index + 1}. ${team.name} - Points: ${team.points}, NRR: ${team.nrr}`);
    });
    
    // First team should have highest points
    expect(sorted[0].points).toBeGreaterThanOrEqual(sorted[1].points);
    
    // If points are equal, NRR should be the deciding factor
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i].points === sorted[i + 1].points) {
        expect(sorted[i].nrr).toBeGreaterThanOrEqual(sorted[i + 1].nrr);
      }
    }
  });
  
  test('Verify overs conversion - cricket format', () => {
    console.log('\n=== Overs Conversion Tests ===');
    
    const decimal1 = oversToDecimal(20.3);
    console.log('20.3 overs → decimal:', decimal1, '(expected: 20.5)');
    expect(decimal1).toBeCloseTo(20.5, 2);
    
    const decimal2 = oversToDecimal(18.5);
    console.log('18.5 overs → decimal:', decimal2, '(expected: 18.833)');
    expect(decimal2).toBeCloseTo(18.833, 2);
    
    // Reverse conversion
    const cricket1 = decimalToOvers(20.5);
    console.log('20.5 decimal → overs:', cricket1, '(expected: 20.3)');
    expect(cricket1).toBeCloseTo(20.3, 1);
    
    const cricket2 = decimalToOvers(18.833);
    console.log('18.833 decimal → overs:', cricket2, '(expected: 18.5)');
    expect(cricket2).toBeCloseTo(18.5, 1);
  });
  
  test('Comprehensive scenario validation', () => {
    
    const scenarios = [
      {
        name: 'Q1a: RR vs DC - Batting First',
        yourTeam: 'Rajasthan Royals',
        oppTeam: 'Delhi Capitals',
        position: 3,
        toss: 'batting',
        runs: 120,
        overs: 20
      },
      {
        name: 'Q1b: RR vs DC - Bowling First',
        yourTeam: 'Rajasthan Royals',
        oppTeam: 'Delhi Capitals',
        position: 3,
        toss: 'bowling',
        runs: 119,
        overs: 20
      },
      {
        name: 'Q2c: RR vs RCB - Batting First',
        yourTeam: 'Rajasthan Royals',
        oppTeam: 'Royal Challengers Bangalore',
        position: 3,
        toss: 'batting',
        runs: 80,
        overs: 20
      },
      {
        name: 'Q2d: RR vs RCB - Bowling First',
        yourTeam: 'Rajasthan Royals',
        oppTeam: 'Royal Challengers Bangalore',
        position: 3,
        toss: 'bowling',
        runs: 79,
        overs: 20
      }
    ];
    
    scenarios.forEach(scenario => {
      const result = calculateRequiredPerformance(
        initialPointsTable,
        scenario.yourTeam,
        scenario.oppTeam,
        scenario.position,
        scenario.toss,
        scenario.runs,
        scenario.overs
      );
      
      console.log(`\n${scenario.name}:`);
      if (scenario.toss === 'batting' && result.minRuns !== null) {
        console.log(`  Restrict between: ${result.minRuns} - ${result.maxRuns} runs`);
        console.log(`  NRR Range: ${result.minNRR?.toFixed(3)} - ${result.maxNRR?.toFixed(3)}`);
      } else if (scenario.toss === 'bowling' && result.minOvers !== null) {
        console.log(`  Chase between: ${result.minOvers} - ${result.maxOvers} overs`);
        console.log(`  NRR Range: ${result.minNRR?.toFixed(3)} - ${result.maxNRR?.toFixed(3)}`);
      } else {
        console.log('  NOT POSSIBLE');
      }
      
      expect(result).toBeDefined();
    });
  });
});