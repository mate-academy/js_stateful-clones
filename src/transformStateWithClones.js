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
    if (action.type === 'addProperties') {
      // створюю копію state
      const copyStateAdd = { ...currentState };

      Object.assign(copyStateAdd, action.extraData);

      history.push(copyStateAdd);
      currentState = copyStateAdd;
    } else if (action.type === 'removeProperties') {
      const copyStateRemove = { ...currentState };

      for (const key of action.keysToRemove) {
        delete copyStateRemove[key];
      }
      history.push(copyStateRemove);
      currentState = copyStateRemove;
    } else if (action.type === 'clear') {
      const clearedState = {};

      history.push(clearedState);
      currentState = clearedState;
    }
  }

  return history;
}

module.exports = transformStateWithClones;
