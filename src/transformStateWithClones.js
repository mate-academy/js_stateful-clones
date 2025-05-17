'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let currentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties') {
      const extraData = action.extraData || {};

      for (const keys in extraData) {
        currentState[keys] = extraData[keys];
      }
    } else if (action.type === 'removeProperties') {
      const keysToRemove = action.keysToRemove || [];

      for (const key2 of keysToRemove) {
        delete currentState[key2];
      }
    }
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
