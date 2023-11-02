'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const newState = result.length === 0
      ? { ...state }
      : Object.assign({}, result[result.length - 1]);

    if (actions[i].type === 'addProperties') {
      Object.assign(newState, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      for (const keyRemove of actions[i].keysToRemove) {
        delete newState[keyRemove];
      }
    }

    if (actions[i].type === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    result.push(newState);
  }

  return result;
}

module.exports = transformStateWithClones;
