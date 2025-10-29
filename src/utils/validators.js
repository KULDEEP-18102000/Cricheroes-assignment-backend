/**
 * Validate user inputs for NRR calculation
 */
export function validateInput(data) {
  const { yourTeam, oppTeam, overs, desiredPosition, tossResult, runs } = data;
  
  const errors = [];

  if (!yourTeam || yourTeam.trim() === '') {
    errors.push('Your team is required');
  }

  if (!oppTeam || oppTeam.trim() === '') {
    errors.push('Opposition team is required');
  }

  if (yourTeam === oppTeam) {
    errors.push('Your team and opposition team cannot be the same');
  }

  if (!overs || overs <= 0 || overs > 50) {
    errors.push('Overs must be between 1 and 50');
  }

  if (!desiredPosition || desiredPosition < 1 || desiredPosition > 5) {
    errors.push('Desired position must be between 1 and 5');
  }

  if (!tossResult || !['batting', 'bowling'].includes(tossResult)) {
    errors.push('Toss result must be either "batting" or "bowling"');
  }

  if (runs === undefined || runs === null || runs < 0) {
    errors.push('Runs must be a non-negative number');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}