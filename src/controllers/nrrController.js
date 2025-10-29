import { initialPointsTable } from '../models/PointsTable.js';
import { validateInput } from '../utils/validators.js';
import { calculateRequiredPerformance } from '../services/positionFinder.js';


export function getPointsTable(req, res) {
  try {
    res.json({
      success: true,
      data: initialPointsTable
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching points table',
      error: error.message
    });
  }
}


export function calculateNRR(req, res) {
  try {
    const { yourTeam, oppTeam, overs, desiredPosition, tossResult, runs } = req.body;
    
    // Validate input
    const validation = validateInput(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    // Calculate required performance
    const result = calculateRequiredPerformance(
      initialPointsTable,
      yourTeam,
      oppTeam,
      parseInt(desiredPosition),
      tossResult,
      parseFloat(runs),
      parseFloat(overs)
    );
    
    // Format response based on scenario
    let response = {
      success: true,
      data: {
        yourTeam,
        oppTeam,
        overs,
        desiredPosition,
        tossResult,
        runs
      }
    };
    
    if (tossResult === 'batting') {
      // Batting first scenario
      if (result.minRuns === null || result.maxRuns === null) {
        response.message = `It is not possible for ${yourTeam} to reach position ${desiredPosition} in this scenario.`;
        response.possible = false;
      } else {
        response.message = `If ${yourTeam} scores ${runs} runs in ${overs} overs, ${yourTeam} needs to restrict ${oppTeam} between ${result.minRuns} to ${result.maxRuns} runs in ${overs} overs.`;
        response.runsRange = {
          min: result.minRuns,
          max: result.maxRuns
        };
        response.nrrRange = {
          min: result.minNRR,
          max: result.maxNRR
        };
        response.possible = true;
      }
    } else {
      // Bowling first scenario
      if (result.minOvers === null || result.maxOvers === null) {
        response.message = `It is not possible for ${yourTeam} to reach position ${desiredPosition} in this scenario.`;
        response.possible = false;
      } else {
        response.message = `${yourTeam} needs to chase ${runs} runs between ${result.minOvers} and ${result.maxOvers} overs.`;
        response.oversRange = {
          min: result.minOvers,
          max: result.maxOvers
        };
        response.nrrRange = {
          min: result.minNRR,
          max: result.maxNRR
        };
        response.possible = true;
      }
    }
    
    res.json(response);
    
  } catch (error) {
    console.error('Error calculating NRR:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating NRR requirements',
      error: error.message
    });
  }
}