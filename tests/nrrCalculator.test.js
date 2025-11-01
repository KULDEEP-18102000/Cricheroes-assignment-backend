import { describe, test, expect } from '@jest/globals';
import { calculateNewNRR, updateTeamAfterMatch } from '../src/services/nrrCalculator.js';
import { calculateRequiredPerformance } from '../src/services/positionFinder.js';
import { initialPointsTable } from '../src/models/PointsTable.js';

describe('IPL NRR Calculator - Assignment Test Cases', () => {
  
  /**
   * Q-1a: RR vs DC - Batting First (120 runs in 20 overs)
   * Expected: Restrict DC between 69 to 119 runs
   * Expected NRR: 0.278 to 0.596
   */
  test('Q-1a: RR vs DC - Batting First (120 runs)', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Delhi Capitals',
      3,
      'batting',
      120,
      20
    );
    
    console.log('\n=== Q-1a: RR vs DC - Batting First ===');
    console.log('Expected: minRuns: 69, maxRuns: 119');
    console.log('Actual:  ', `minRuns: ${result.minRuns}, maxRuns: ${result.maxRuns}`);
    console.log('Expected: minNRR: 0.278, maxNRR: 0.596');
    console.log('Actual:  ', `minNRR: ${result.minNRR?.toFixed(3)}, maxNRR: ${result.maxNRR?.toFixed(3)}`);
    
    // Verify result is defined
    expect(result).toBeDefined();
    expect(result.minRuns).toBeDefined();
    expect(result.maxRuns).toBeDefined();
    
    // Exact value assertions
    expect(result.minRuns).toBe(69);
    expect(result.maxRuns).toBe(119);
    
    // NRR assertions (with tolerance for floating point)
    expect(result.minNRR).toBeCloseTo(0.278, 2); // Tolerance: ±0.01
    expect(result.maxNRR).toBeCloseTo(0.596, 2); // Tolerance: ±0.01
    
    console.log('✅ Q-1a PASSED\n');
  });
  
  /**
   * Q-1b: RR vs DC - Bowling First (chase 119 runs)
   * Expected: Chase between 14.2 to 20 overs
   * Expected NRR: 0.278 to 0.595
   */
  test('Q-1b: RR vs DC - Bowling First (chase 119 runs)', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Delhi Capitals',
      3,
      'bowling',
      119,
      20
    );
    
    console.log('\n=== Q-1b: RR vs DC - Bowling First ===');
    console.log('Expected: minOvers: 14.2, maxOvers: 20');
    console.log('Actual:  ', `minOvers: ${result.minOvers}, maxOvers: ${result.maxOvers}`);
    console.log('Expected: minNRR: 0.278, maxNRR: 0.595');
    console.log('Actual:  ', `minNRR: ${result.minNRR?.toFixed(3)}, maxNRR: ${result.maxNRR?.toFixed(3)}`);
    
    // Verify result is defined
    expect(result).toBeDefined();
    expect(result.minOvers).toBeDefined();
    expect(result.maxOvers).toBeDefined();
    
    // Exact value assertions for overs
    expect(result.minOvers).toBe(14.2);
    expect(result.maxOvers).toBe(20);
    
    // NRR assertions (with tolerance for floating point)
    expect(result.minNRR).toBeCloseTo(0.278, 2); // Tolerance: ±0.01
    expect(result.maxNRR).toBeCloseTo(0.595, 2); // Tolerance: ±0.01
    
    console.log('✅ Q-1b PASSED\n');
  });
  
  /**
   * Q-2c: RR vs RCB - Batting First (80 runs in 20 overs)
   * Expected: Restrict RCB between 57 to 70 runs
   * Expected NRR: 0.32 to 0.402
   */
  test('Q-2c: RR vs RCB - Batting First (80 runs)', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Royal Challengers Bangalore',
      3,
      'batting',
      80,
      20
    );
    
    console.log('\n=== Q-2c: RR vs RCB - Batting First ===');
    console.log('Expected: minRuns: 57, maxRuns: 70');
    console.log('Actual:  ', `minRuns: ${result.minRuns}, maxRuns: ${result.maxRuns}`);
    console.log('Expected: minNRR: 0.32, maxNRR: 0.402');
    console.log('Actual:  ', `minNRR: ${result.minNRR?.toFixed(3)}, maxNRR: ${result.maxNRR?.toFixed(3)}`);
    
    // Verify result is defined
    expect(result).toBeDefined();
    expect(result.minRuns).toBeDefined();
    expect(result.maxRuns).toBeDefined();
    
    // Exact value assertions
    expect(result.minRuns).toBe(57);
    expect(result.maxRuns).toBe(70);
    
    // NRR assertions (with tolerance for floating point)
    expect(result.minNRR).toBeCloseTo(0.32, 2); // Tolerance: ±0.01
    expect(result.maxNRR).toBeCloseTo(0.402, 2); // Tolerance: ±0.01
    
    console.log('✅ Q-2c PASSED\n');
  });
  
  /**
   * Q-2d: RR vs RCB - Bowling First (chase 79 runs)
   * Expected: Chase between 17.2 to 18.5 overs
   * Expected NRR: 0.324 to 0.404
   */
  test('Q-2d: RR vs RCB - Bowling First (chase 79 runs)', () => {
    const result = calculateRequiredPerformance(
      initialPointsTable,
      'Rajasthan Royals',
      'Royal Challengers Bangalore',
      3,
      'bowling',
      79,
      20
    );
    
    console.log('\n=== Q-2d: RR vs RCB - Bowling First ===');
    console.log('Expected: minOvers: 17.2, maxOvers: 18.5');
    console.log('Actual:  ', `minOvers: ${result.minOvers}, maxOvers: ${result.maxOvers}`);
    console.log('Expected: minNRR: 0.324, maxNRR: 0.404');
    console.log('Actual:  ', `minNRR: ${result.minNRR?.toFixed(3)}, maxNRR: ${result.maxNRR?.toFixed(3)}`);
    
    // Verify result is defined
    expect(result).toBeDefined();
    expect(result.minOvers).toBeDefined();
    expect(result.maxOvers).toBeDefined();
    
    // Exact value assertions for overs
    expect(result.minOvers).toBe(17.2);
    expect(result.maxOvers).toBe(18.5);
    
    // NRR assertions (with tolerance for floating point)
    expect(result.minNRR).toBeCloseTo(0.324, 2); // Tolerance: ±0.01
    expect(result.maxNRR).toBeCloseTo(0.404, 2); // Tolerance: ±0.01
    
    console.log('✅ Q-2d PASSED\n');
  });
});

describe('Summary Test - All 4 Scenarios', () => {
  test('All Assignment Test Cases Summary', () => {
    console.log('\n' + '='.repeat(70));
    console.log('                 ASSIGNMENT TEST CASES SUMMARY');
    console.log('='.repeat(70));
    
    const testCases = [
      {
        name: 'Q-1a: RR vs DC - Batting First',
        params: {
          yourTeam: 'Rajasthan Royals',
          oppTeam: 'Delhi Capitals',
          position: 3,
          tossResult: 'batting',
          runs: 120,
          overs: 20
        },
        expected: {
          minRuns: 69,
          maxRuns: 119,
          minNRR: 0.278,
          maxNRR: 0.596
        }
      },
      {
        name: 'Q-1b: RR vs DC - Bowling First',
        params: {
          yourTeam: 'Rajasthan Royals',
          oppTeam: 'Delhi Capitals',
          position: 3,
          tossResult: 'bowling',
          runs: 119,
          overs: 20
        },
        expected: {
          minOvers: 14.2,
          maxOvers: 20,
          minNRR: 0.278,
          maxNRR: 0.595
        }
      },
      {
        name: 'Q-2c: RR vs RCB - Batting First',
        params: {
          yourTeam: 'Rajasthan Royals',
          oppTeam: 'Royal Challengers Bangalore',
          position: 3,
          tossResult: 'batting',
          runs: 80,
          overs: 20
        },
        expected: {
          minRuns: 57,
          maxRuns: 70,
          minNRR: 0.32,
          maxNRR: 0.402
        }
      },
      {
        name: 'Q-2d: RR vs RCB - Bowling First',
        params: {
          yourTeam: 'Rajasthan Royals',
          oppTeam: 'Royal Challengers Bangalore',
          position: 3,
          tossResult: 'bowling',
          runs: 79,
          overs: 20
        },
        expected: {
          minOvers: 17.2,
          maxOvers: 18.5,
          minNRR: 0.324,
          maxNRR: 0.404
        }
      }
    ];
    
    let allPassed = true;
    
    testCases.forEach((testCase, index) => {
      console.log(`\n${index + 1}. ${testCase.name}`);
      console.log('-'.repeat(70));
      
      const result = calculateRequiredPerformance(
        initialPointsTable,
        testCase.params.yourTeam,
        testCase.params.oppTeam,
        testCase.params.position,
        testCase.params.tossResult,
        testCase.params.runs,
        testCase.params.overs
      );
      
      if (testCase.params.tossResult === 'batting') {
        // Batting First
        console.log(`   Expected: Restrict between ${testCase.expected.minRuns} to ${testCase.expected.maxRuns} runs`);
        console.log(`   Actual:   Restrict between ${result.minRuns} to ${result.maxRuns} runs`);
        console.log(`   Expected NRR: ${testCase.expected.minNRR} to ${testCase.expected.maxNRR}`);
        console.log(`   Actual NRR:   ${result.minNRR?.toFixed(3)} to ${result.maxNRR?.toFixed(3)}`);
        
        const runsMatch = result.minRuns === testCase.expected.minRuns && 
                         result.maxRuns === testCase.expected.maxRuns;
        const nrrMatch = Math.abs(result.minNRR - testCase.expected.minNRR) < 0.01 &&
                        Math.abs(result.maxNRR - testCase.expected.maxNRR) < 0.01;
        
        if (runsMatch && nrrMatch) {
          console.log('   ✅ PASSED');
        } else {
          console.log('   ❌ FAILED');
          allPassed = false;
        }
        
      } else {
        // Bowling First
        console.log(`   Expected: Chase between ${testCase.expected.minOvers} to ${testCase.expected.maxOvers} overs`);
        console.log(`   Actual:   Chase between ${result.minOvers} to ${result.maxOvers} overs`);
        console.log(`   Expected NRR: ${testCase.expected.minNRR} to ${testCase.expected.maxNRR}`);
        console.log(`   Actual NRR:   ${result.minNRR?.toFixed(3)} to ${result.maxNRR?.toFixed(3)}`);
        
        const oversMatch = result.minOvers === testCase.expected.minOvers && 
                          result.maxOvers === testCase.expected.maxOvers;
        const nrrMatch = Math.abs(result.minNRR - testCase.expected.minNRR) < 0.01 &&
                        Math.abs(result.maxNRR - testCase.expected.maxNRR) < 0.01;
        
        if (oversMatch && nrrMatch) {
          console.log('   ✅ PASSED');
        } else {
          console.log('   ❌ FAILED');
          allPassed = false;
        }
      }
    });
    
    console.log('\n' + '='.repeat(70));
    if (allPassed) {
      console.log('🎉 ALL ASSIGNMENT TEST CASES PASSED! 🎉');
    } else {
      console.log('❌ SOME TEST CASES FAILED - Please review the output above');
    }
    console.log('='.repeat(70) + '\n');
    
    expect(allPassed).toBe(true);
  });
});