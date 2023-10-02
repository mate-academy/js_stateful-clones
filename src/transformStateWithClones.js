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

  for (const item of actions) {
    switch (item.type) {
      case 'addProperties':
        Object.assign(copyState, item.extraData);
        break;

      case 'clear':
        for (const prop in copyState) {
          delete copyState[prop];
        }
        break;

      case 'removeProperties':
        for (const char of item.keysToRemove) {
          if (copyState.hasOwnProperty(char)) {
            delete copyState[char];
          }
        }
    }

    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
