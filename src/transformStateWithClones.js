'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const allActions = []; // final array
  const newState = { ...state };

  for (const keys in actions) {
    if (actions[keys].type === 'clear') {
      for (const property in newState) {
        delete newState[property];
      }
    }

    if (actions[keys].type === 'addProperties') {
      Object.assign(newState, actions[keys].extraData);
    }

    if (actions[keys].type === 'removeProperties') {
      for (const action in actions[keys].keysToRemove) {
        delete newState[actions[keys].keysToRemove[action]];
      }
    }

    allActions.push({ ...newState });
  }

  return allActions;
}

module.exports = transformStateWithClones;
