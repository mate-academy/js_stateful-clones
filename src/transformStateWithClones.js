'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  const mutableState = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(mutableState, key.extraData);

        result.push({ ...mutableState });
        break;

      case 'clear':
        for (const prop of Object.getOwnPropertyNames(mutableState)) {
          delete mutableState[prop];
        }
        result.push({ ...mutableState });
        break;

      case 'removeProperties':
        for (const val of key.keysToRemove) {
          delete mutableState[val];
        }
        result.push({ ...mutableState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
