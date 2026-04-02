'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  if (actions.length === 0) {
    return [];
  }

  const stateSequence = [];

  const currentState = Object.assign({}, state);

  for (const action of actions) {
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

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    stateSequence.push(Object.assign({}, currentState));
  }

  return stateSequence;
};

module.exports = transformStateWithClones;
