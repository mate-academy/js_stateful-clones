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

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        for (const key in i.extraData) {
          newState[key] = i.extraData[key];
        }

        result.push(Object.assign({}, newState));
        break;

      case 'removeProperties':
        i.keysToRemove.forEach(j => delete newState[j]);

        result.push(Object.assign({}, newState));
        break;

      case 'clear':
        for (const k in newState) {
          delete newState[k];
        }

        result.push(Object.assign({}, newState));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
