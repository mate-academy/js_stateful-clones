'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const result = [];

  for (const action of actions) {
    let newState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        result.push(newState);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        result.push(newState);
        break;

      case 'clear':
        newState = {};
        result.push(newState);
        break;
    }

    currentState = { ...newState };
  }

  return result;
}

module.exports = transformStateWithClones;
