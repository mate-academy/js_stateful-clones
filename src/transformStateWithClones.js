'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    let stateCopy = { ...currentState };

    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (let k = 0; k < action.keysToRemove.length; k++) {
          delete stateCopy[action.keysToRemove[k]];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    results.push(stateCopy);
    currentState = { ...stateCopy };
  }

  return results;
}

module.exports = transformStateWithClones;
