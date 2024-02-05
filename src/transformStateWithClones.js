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
    switch (true) {
      case action['type'] === 'clear':
        states.push({});
        Object.keys(currentState).forEach(key => delete currentState[key]);
        break;
      case action['type'] === 'addProperties':
        states.push({ ...Object.assign(currentState, action['extraData']) });
        break;
      case action['type'] === 'removeProperties':
        for (const key of action['keysToRemove']) {
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
