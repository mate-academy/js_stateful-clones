'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const prop of actions) {
    switch (prop.type) {
      case 'clear':
        for (const keys in newState) {
          delete newState[keys];
        }
        break;

      case 'removeProperties':
        for (const key of prop.keysToRemove) {
          delete newState[key];
        }
        break;

      case 'addProperties':
        Object.assign(newState, prop.extraData);
        break;
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
