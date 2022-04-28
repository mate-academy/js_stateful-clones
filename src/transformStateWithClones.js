'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        for (const act of action.keysToRemove) {
          delete newState[act];
        };
        break;

      default:
        newState = {};
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
