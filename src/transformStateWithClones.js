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
    if (action.type === 'addProperties') {
      Object.assign(clonedState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (let n = 0; n < action.keysToRemove.length; n++) {
        delete clonedState[action.keysToRemove[n]];
      }
    }

    if (action.type === 'clear') {
      Object.keys(clonedState).forEach(key => delete clonedState[key]);
    }

    stateChanges.push(Object.assign({}, clonedState));
  }

  return stateChanges;
}

module.exports = transformStateWithClones;
