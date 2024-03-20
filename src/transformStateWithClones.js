'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const oldState = [];
  const copyState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete copyState[key]);
        break;
      default :
        continue;
    }

    oldState.push({ ...copyState });
  }

  return oldState;
}

module.exports = transformStateWithClones;
