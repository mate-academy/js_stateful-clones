'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = { ...state };
  const resultActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        Object.assign(stateHistory, action.extraData);
        break;
      }

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete stateHistory[key];
        }
        break;
      }

      case 'clear': {
        for (const property in stateHistory) {
          delete stateHistory[property];
        }
        break;
      }

      default:
        throw new Error('Something went wrong, check ur input data');
    }

    resultActions.push({ ...stateHistory });
  }

  return resultActions;
}

module.exports = transformStateWithClones;
