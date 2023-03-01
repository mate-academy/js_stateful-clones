'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allStates = [Object.assign({}, state)];

  for (let i = 0; i < actions.length; i++) {
    const action = actions[i];
    const currentState = Object.assign({}, allStates[i]);

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
        for (const key in currentState) {
          delete currentState[key];
        }
        break;
    }

    allStates.push(currentState);
  }

  return allStates.slice(1);
}

module.exports = transformStateWithClones;
