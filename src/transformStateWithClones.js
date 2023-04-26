'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arr = [];

  for (const key of actions) {
    if (key.type === 'clear') {
      newState = {};
    }

    if (key.type === 'addProperties') {
      Object.assign(newState, key.extraData);
    }

    if (key.type === `removeProperties`) {
      for (const type of key.keysToRemove) {
        delete newState[type];
      }
    }
    arr.push({ ...newState });
  }

  return arr;
}

module.exports = transformStateWithClones;
