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
    let newState;

    switch (action.type) {
      case 'addProperties':
        newState = { ...currentState };
        Object.assign(newState, action.extraData);
        break;

      case 'removeProperties':
        newState = { ...currentState };

        for (const keys of action.keysToRemove) {
          delete newState[keys];
        }
        break;

      case 'clear':
        newState = {};
        break;
    }

    result.push(newState);
    currentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
