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
        Object.assign(copy, action.extraData);
        result.push({ ...copy });
        break;

      case 'removeProperties':
        for (let i = 0; i < action['keysToRemove'].length; i++) {
          delete copy[action.keysToRemove[i]];
        }
        result.push({ ...copy });
        break;

      default:
        for (const key in copy) {
          delete copy[key];
        }
        result.push({ ...copy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
