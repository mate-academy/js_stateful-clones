'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedState = { ...state };
  const stateChanges = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (let n = 0; n < action.keysToRemove.length; n++) {
          delete clonedState[action.keysToRemove[n]];
        }
        break;

      case 'clear':
        Object.keys(clonedState).forEach(key => delete clonedState[key]);
        break;
    }

    stateChanges.push(Object.assign({}, clonedState));
  }

  return stateChanges;
}

module.exports = transformStateWithClones;
