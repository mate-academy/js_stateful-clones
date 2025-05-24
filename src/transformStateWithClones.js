'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentStates = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentStates = {};
    } else if (action.type === 'addProperties') {
      currentStates = { ...currentStates, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      currentStates = { ...currentStates };

      for (const key of action.keysToRemove) {
        delete currentStates[key];
      }
    }

    history.push({ ...currentStates });
  }

  return history;
}

module.exports = transformStateWithClones;
