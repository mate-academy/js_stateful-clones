'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let copy = {};

  Object.assign(copy, state);

  const result = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(copy, action.extraData);
      result.push({ ...copy });
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete copy[key];
      }
      result.push({ ...copy });
    }

    if (action.type === 'clear') {
      copy = {};
      result.push({ ...copy });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
