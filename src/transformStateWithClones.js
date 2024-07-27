'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  let currentState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        currentState[key] = actions[i].extraData[key];
      }
      res.push(Object.assign({}, currentState));
    }

    if (actions[i].type === 'removeProperties') {
      for (const key of actions[i].keysToRemove) {
        delete currentState[key];
      }
      res.push(Object.assign({}, currentState));
    }

    if (actions[i].type === 'clear') {
      currentState = {};
      res.push(Object.assign({}, currentState));
    }
  }

  return res;
}

module.exports = transformStateWithClones;
