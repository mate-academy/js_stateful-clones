'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(initialState, actions) {
  const result = [];
  let currentState = { ...initialState };

  for (const action of actions) {
    let nextState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...nextState,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete nextState[key]);
        break;
      case 'clear':
        nextState = {};
        break;
      default:
        continue;
    }

    result.push(nextState);

    currentState = { ...nextState };
  }

  return result;
}

module.exports = transformStateWithClones;
