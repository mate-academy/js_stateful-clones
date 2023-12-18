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
        for (const remove of action.keysToRemove) {
          delete copyState[remove];
        }
        break;

      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        break;
    }

    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
