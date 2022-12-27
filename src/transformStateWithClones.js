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
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copy[key];
      }
    } else if (action.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    } else {
      break;
    }
    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
