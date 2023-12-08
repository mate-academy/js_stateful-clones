'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = {};

  Object.assign(newState, state);

  const arrStateClone = [];

  for (const action of actions) {
    if (action.type === 'clear') {
      Object.keys(newState).forEach(key => {
        delete newState[key];
      });

      arrStateClone.push({ ...newState });
    }

    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);

      arrStateClone.push({ ...newState });
    }

    if (action.type === 'removeProperties') {
      const keyToRemove = action.keysToRemove;

      for (const key of keyToRemove) {
        delete newState[key];
      }

      arrStateClone.push({ ...newState });
    }
  }

  return arrStateClone;
}

module.exports = transformStateWithClones;
