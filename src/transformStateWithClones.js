'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonedStates = [{ ...state }];

  for (const action of actions) {
    const newState = { ...clonedStates[clonedStates.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;
      case 'clear':
        for (const key in newState) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;
    }
    clonedStates.push(newState);
  }

  return clonedStates.slice(1);
}

module.exports = transformStateWithClones;
