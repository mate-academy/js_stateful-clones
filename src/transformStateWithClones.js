'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let newState = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newState = { ...newState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newState[key];
      }
    } else if (action.type === 'clear') {
      newState = {};
    }
    history.push({ ...newState });
  }

  return history;
  // write code here
}

module.exports = transformStateWithClones;
