'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const [key, value] of Object.entries(action.extraData)) {
          copy[key] = value;
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
