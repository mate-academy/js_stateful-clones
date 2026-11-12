'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const history = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      newState = {};
    } else if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    }

    history.push({ ...newState });
  }

  return history;
}

module.exports = transformStateWithClones;
