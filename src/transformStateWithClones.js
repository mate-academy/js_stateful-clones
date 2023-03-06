'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let obj = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      obj = Object.assign(obj, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const char of action.keysToRemove) {
        delete obj[char];
      }
    } else if (action.type === 'clear') {
      obj = {};
    }

    result.push({ ...obj });
  }

  return result;
}

module.exports = transformStateWithClones;
