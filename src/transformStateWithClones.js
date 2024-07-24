'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = [];
  let currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;
    }
    newState.push({ ...currentState });
  }

  return newState;
}

module.exports = transformStateWithClones;
