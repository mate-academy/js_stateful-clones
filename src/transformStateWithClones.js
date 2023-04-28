'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  let currentState = Object.assign({}, state);

  for (const action of actions) {
    let updatedState = Object.assign({}, currentState);

    switch (action.type) {
      case 'addProperties':
        updatedState = Object.assign({}, updatedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete updatedState[key];
        }
        break;

      case 'clear':
        updatedState = {};
        break;
    }

    result.push(Object.assign({}, updatedState));
    currentState = updatedState;
  }

  return result;
}

module.exports = transformStateWithClones;
