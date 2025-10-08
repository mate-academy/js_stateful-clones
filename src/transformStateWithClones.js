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
      currentState = { ...currentState, ...action.extraData };
    } else if (action.type === 'removeProperties') {
      const copy = { ...currentState };

      for (const key of action.keysToRemove) {
        delete copy[key];
      }
      currentState = copy;
    }
    history.push({ ...currentState });
  }

  return history;
}

module.exports = transformStateWithClones;
