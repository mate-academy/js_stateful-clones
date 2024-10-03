'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let step = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      step = {};
    }

    if (action.type === 'addProperties') {
      Object.assign(step, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete step[key];
      }
    }

    result.push({ ...step });
  }

  return result;
}

module.exports = transformStateWithClones;
