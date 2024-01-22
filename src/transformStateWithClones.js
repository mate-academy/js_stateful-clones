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
    switch (actions[action].type) {
      case 'addProperties':
        const addValues = actions[action].extraData;

        for (const addValue in addValues) {
          stateForResult[addValue] = addValues[addValue];
        }
        break;

      case 'removeProperties':
        const removeKeys = actions[action].keysToRemove;

        for (const removeKey of removeKeys) {
          delete stateForResult[removeKey];
        }
        break;

      case 'clear':
        for (const stateKey in stateForResult) {
          delete stateForResult[stateKey];
        }
        break;
    }
    result.push(stateForResult);
    stateForResult = { ...stateForResult };
  }

  return result;
}

module.exports = transformStateWithClones;
