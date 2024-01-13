'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const clonedStates = [];
  const clonedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clonedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (clonedState.hasOwnProperty(key)) {
            delete clonedState[key];
          }
        }
        break;

      case 'clear':
        for (const key in clonedState) {
          delete clonedState[key];
        }
        break;
    }

    clonedStates.push({ ...clonedState });
  }

  return clonedStates;
}

module.exports = transformStateWithClones;
