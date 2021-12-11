'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let temp = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      temp = Object.assign(temp, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete temp[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in temp) {
        delete temp[key];
      }
    }
    res.push({ ...temp });
  }

  return res;
}

module.exports = transformStateWithClones;
