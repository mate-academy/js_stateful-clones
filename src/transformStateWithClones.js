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
    switch (action.type) {
      case 'addProperties':
        tmp = {
          ...tmp, ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete tmp[key];
        }
        break;

      case 'clear':
        tmp = {};
        break;
    }
    arr.push({ ...tmp });
  }

  return arr;
}

module.exports = transformStateWithClones;
