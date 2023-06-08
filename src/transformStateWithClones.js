'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultActions = [];
  let newState = { ...state };

  for (const action of actions) {
    const { type } = action;
    const obj = { ...newState };

    if (type === 'addProperties') {
      const { extraData } = action;

      Object.assign(obj, extraData);
    }

    if (type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        delete obj[key];
      }
    }

    if (type === 'clear') {
      for (const key in obj) {
        delete obj[key];
      }
    }

    newState = obj;
    resultActions.push(newState);
  }

  return resultActions;
}

module.exports = transformStateWithClones;
