'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete copyState[prop];
        }
        break;

      case 'clear':
        for (const prop in copyState) {
          delete copyState[prop];
        }
        break;
    }

    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
