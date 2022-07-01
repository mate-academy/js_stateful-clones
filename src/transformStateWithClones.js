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
    currentState = { ...currentState };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (key in currentState) {
            delete currentState[key];
          }
        }

        break;

      case 'clear':
        for (const key of Object.keys(currentState)) {
          delete currentState[key];
        }
    }

    result.push(currentState);
  }

  return result;
}

module.exports = transformStateWithClones;
