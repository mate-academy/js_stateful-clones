'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const currentState = Object.assign({}, state);
  const modifiedStates = actions.map(action => {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          currentState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete currentState[value];
        }
        break;

      case 'clear':
        for (const key in currentState) {
          delete currentState[key];
        }
    }

    const newState = Object.assign({}, currentState);

    return newState;
  });

  return modifiedStates;
}

module.exports = transformStateWithClones;
