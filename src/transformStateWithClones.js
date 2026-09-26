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

  for (const action of actions) {
    let stateCopy = { ...state };

    if (historyTransformState.length !== 0) {
      stateCopy = {
        ...historyTransformState[historyTransformState.length - 1],
      };
    }

    switch (action.type) {
      case 'addProperties':
        for (const extraData in action.extraData) {
          stateCopy[extraData] = action.extraData[extraData];
        }
        break;
      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete stateCopy[keysToRemove];
        }
        break;
      default:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    historyTransformState.push({ ...stateCopy });
  }

  return historyTransformState;
}

module.exports = transformStateWithClones;
