'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const newState = {
    ...state,
  };
  const setOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(newState, action.extraData);
        break;

      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        break;

      case ('clear'):
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    setOfStates.push({ ...newState });
  }

  return setOfStates;
}

module.exports = transformStateWithClones;
