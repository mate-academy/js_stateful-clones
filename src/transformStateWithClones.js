'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const [key, value] of Object.entries(action.extraData)) {
        newState[key] = value;
      }
      history.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      history.push({ ...newState });
    }

    if (action.type === 'clear') {
      Object.keys(newState).forEach((key) => {
        delete newState[key];
      });
      history.push({ ...newState });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
