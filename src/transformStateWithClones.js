'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        const updatedState = { ...stateCopy };

        for (const keyToRemove of action.keysToRemove) {
          delete updatedState[keyToRemove];
        }
        stateCopy = updatedState;
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
