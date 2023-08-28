'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const statesArray = [];
  const cloneState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }

        break;
      }

      case 'clear': {
        for (const key of Object.keys(cloneState)) {
          delete cloneState[key];
        }

        break;
      }

      default: {
        return {};
      }
    }
    statesArray.push({ ...cloneState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
