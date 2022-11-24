'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentState = { ...state };

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      Object.assign(currentState, action.extraData);
    }

    if (type === 'removeProperties') {
      action.keysToRemove.forEach(key => delete currentState[key]);
    }

    if (type === 'clear') {
      currentState = {};
    }

    result.push({ ...currentState });
  }

  return result;
}

module.exports = transformStateWithClones;
