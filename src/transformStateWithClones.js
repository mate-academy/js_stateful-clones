'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = structuredClone(state);
  const stateHistory = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          transformedState[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete transformedState[key];
        }
        break;

      default:
        for (const key in transformedState) {
          delete transformedState[key];
        }
        break;
    }

    stateHistory.push(structuredClone(transformedState));
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
