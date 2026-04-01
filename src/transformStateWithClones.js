'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = state;

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result.push(newState);
        break;

      case 'removeProperties':
        for (const k of action.keysToRemove) {
          delete newState[k];
        }
        result.push(newState);
        break;

      case 'clear':
        newState = {};
        result.push(newState);
        break;
    }
    currentState = newState;
  }
  return result;
}

module.exports = transformStateWithClones;
