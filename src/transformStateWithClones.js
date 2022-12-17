'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const remove of action.keysToRemove) {
          delete copyState[remove];
        }
        break;

      case 'clear':
        // copyState = {};
        // break;
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
