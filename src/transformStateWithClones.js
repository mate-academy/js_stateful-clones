'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const data in action.extraData) {
          copyState[data] = action.extraData[data];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const part in copyState) {
          delete copyState[part];
        }
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
