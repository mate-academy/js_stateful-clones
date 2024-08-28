'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const stateForEachAction = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateForEachAction, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete stateForEachAction[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in stateForEachAction) {
        delete stateForEachAction[key];
      }
    }

    history.push({ ...stateForEachAction });
  }

  return history;
}

module.exports = transformStateWithClones;
