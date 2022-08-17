'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const newArray = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(cloneState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete cloneState[key];
      }
    }

    if (action.type === 'clear') {
      cloneState = {};
    }

    newArray.push({ ...cloneState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
