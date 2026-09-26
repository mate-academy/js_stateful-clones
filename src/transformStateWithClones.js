'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here

  const historyTransformState = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const extraData in action.extraData) {
          stateCopy[extraData] = action.extraData[extraData];
        }
        historyTransformState.push({ ...stateCopy });
        break;
      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete stateCopy[keysToRemove];
        }
        historyTransformState.push({ ...stateCopy });
        break;
      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        historyTransformState.push({ ...stateCopy });

        break;
    }
  }

  return historyTransformState;
}

module.exports = transformStateWithClones;
