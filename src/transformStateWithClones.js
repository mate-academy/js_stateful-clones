'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [{ ...state }];

  for (const action of actions) {
    let currentState = { ...arrayOfStates[arrayOfStates.length - 1] };

    switch (action.type) {
      case 'addProperties':
        Object.assign(currentState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case 'clear':
        currentState = {};
        break;
    }

    arrayOfStates.push(currentState);
  }

  return arrayOfStates.slice(1);
}

module.exports = transformStateWithClones;
