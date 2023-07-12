'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const stateAction = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          stateAction[key] = action.extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateAction[key];
        }
        break;
      case 'clear':
        for (const key in stateAction) {
          delete stateAction[key];
        }
        break;
    }
    result.push({ ...stateAction });
  }

  return result;
}

module.exports = transformStateWithClones;
