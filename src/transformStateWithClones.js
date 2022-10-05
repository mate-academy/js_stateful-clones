'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        result.push({ ...copy });
        break;
      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete copy[property];
        } result.push({ ...copy });
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
