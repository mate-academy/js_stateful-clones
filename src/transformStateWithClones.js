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
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(nextState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete nextState[key]);
        break;

      case 'clear':
        nextState = {};
        break;
    }

    result.push(nextState);
    currentState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
