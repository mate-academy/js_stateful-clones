'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const currentState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        states.push({});
        Object.keys(currentState).forEach(key => delete currentState[key]);
        break;
      case 'addProperties':
        states.push({ ...Object.assign(currentState, action.extraData) });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (currentState.hasOwnProperty(key)) {
            delete currentState[key];
          }
        }
        states.push({ ...currentState });
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
