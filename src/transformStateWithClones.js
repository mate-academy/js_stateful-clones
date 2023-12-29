'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = JSON.parse(JSON.stringify(state));
  const result = [stateCopy];

  for (const action of actions) {
    // Creating new copy for each iteration
    const newState = JSON.parse(JSON.stringify(result[result.length - 1]));

    switch (action.type) {
      case 'addProperties': {
        const { extraData } = action;

        Object.assign(newState, extraData);
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        keysToRemove.forEach(key => delete newState[key]);
        break;
      }
      case 'clear':
        // next create new epty state
        Object.keys(newState).forEach(key => delete newState[key]);
        break;
      default:
        // handle an error
        throw new Error(`Invalid action type: ${action.type}`);
    }
    result.push(newState);
  }
  result.shift();

  return result;
}

module.exports = transformStateWithClones;
