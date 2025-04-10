'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    let clonedState = { ...currentState };

    switch (action.type) {
      case 'clear':
        clonedState = {};
        break;

      case 'addProperties':
        clonedState = { ...clonedState, ...action.extraData };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clonedState[key];
        }
        break;
    }

    result.push({ ...clonedState });
    currentState = clonedState;
  }

  return result;
}

module.exports = transformStateWithClones;
