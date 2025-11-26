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
    if (action.type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
      history.push({ ...newState });
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
      history.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
      history.push({ ...newState });
    }
  }

  return history;
}

module.exports = transformStateWithClones;
