'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(currentState, action.extraData);
        break;

      case ('removeProperties'):
        for (const key of action.keysToRemove) {
          delete currentState[key];
        }
        break;

      case ('clear'):
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
