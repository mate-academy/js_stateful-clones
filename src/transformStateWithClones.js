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
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
      result.push({ ...copy });
    } else if (action.type === 'removeProperties') {
      for (const property of action.keysToRemove) {
        delete copy[property];
      } result.push({ ...copy });
    } else {
      for (const key in copy) {
        delete copy[key];
      }
      result.push({ ...copy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
