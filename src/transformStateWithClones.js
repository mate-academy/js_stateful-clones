'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let newState = {};

  Object.assign(newState, state);

  const result = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      result.push({});
      newState = {};
    }

    if (action.type === 'removeProperties') {
      for (let i = 0; i < action.keysToRemove.length; i++) {
        delete newState[action.keysToRemove[i]];
      }

      const tmp = {};

      Object.assign(tmp, newState);
      result.push(tmp);
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);

      const tmp = {};

      Object.assign(tmp, newState);
      result.push(tmp);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
