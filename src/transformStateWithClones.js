'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentState = { ...state };
  const setOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        currentState = {};
        setOfStates.push(currentState);
        break;
      case 'addProperties':
        currentState = { ...currentState, ...action.extraData };
        setOfStates.push(currentState);
        break;
      case 'removeProperties':
        currentState = { ...currentState };

        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        setOfStates.push(currentState);
        break;
    }
  }

  return setOfStates;
}

module.exports = transformStateWithClones;
