'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = JSON.parse(JSON.stringify(state));

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        const { extraData } = action;

        newState = {
          ...newState, ...extraData,
        };
        break;
      }

      case 'removeProperties': {
        const { keysToRemove } = action;

        keysToRemove.forEach(key => delete newState[key]);
        break;
      }
      case 'clear':
        // next create new epty state
        newState = {};
        break;
      default:
        // handle an error
        throw new Error(`Invalid action type: ${action.type}`);
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
