'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateForResult = { ...state };

  for (const action in actions) {
    if (actions[action].type === 'addProperties') {
      const addValues = actions[action].extraData;

      for (const addValue in addValues) {
        stateForResult[addValue] = addValues[addValue];
      }
    }

    if (actions[action].type === 'removeProperties') {
      const removeKeys = actions[action].keysToRemove;

      for (const removeKey of removeKeys) {
        delete stateForResult[removeKey];
      }
    }

    if (actions[action].type === 'clear') {
      for (const stateKey in stateForResult) {
        delete stateForResult[stateKey];
      }
    }
    result.push(stateForResult);
    stateForResult = { ...stateForResult };
  }

  return result;
}

module.exports = transformStateWithClones;
