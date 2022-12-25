'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateClone = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const keys in action.extraData) {
        stateClone[keys] = action.extraData[keys];
      }
    }

    if (action.type === 'removeProperties') {
      for (const properties of action.keysToRemove) {
        delete stateClone[properties];
      }
    }

    if (action.type === 'clear') {
      for (const keys in stateClone) {
        delete stateClone[keys];
      }
    }

    const newObj = { ...stateClone };

    result.push(newObj);
  }

  return result;
}

module.exports = transformStateWithClones;
