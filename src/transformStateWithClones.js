'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state }; // do not modify original

  for (const action of actions) {
    let newState;

    switch (action.type) {
      case 'clear':
        newState = {}; // fresh empty object
        break;
      case 'addProperties':
        newState = { ...currentState, ...action.extraData };
        break;
      case 'removeProperties':
        newState = { ...currentState };

        for (const k of action.keysToRemove || []) {
          delete newState[k];
        }
        break;
      default:
        newState = { ...currentState }; // or throw
    }
    history.push(newState);
    currentState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
