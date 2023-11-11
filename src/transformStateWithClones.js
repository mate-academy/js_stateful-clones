'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let tmp = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      tmp = {
        ...tmp, ...action.extraData,
      };
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete tmp[key];
      }
    }

    if (action.type === 'clear') {
      tmp = {};
    }
    arr.push({ ...tmp });
  }

  return arr;
}

module.exports = transformStateWithClones;
