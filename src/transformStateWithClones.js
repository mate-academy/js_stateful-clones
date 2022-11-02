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
    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action['extraData']);

        result.push({ ...currentState });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        });

        result.push({ ...currentState });
        break;

      case 'clear':
        currentState = {};

        result.push({ ...currentState });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
