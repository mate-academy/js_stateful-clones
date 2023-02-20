'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newAArr = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(newState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const type of action.keysToRemove) {
        delete newState[type];
      }
    }

    if (action.type === 'clear') {
      for (const del in newState) {
        delete newState[del];
      }
    }

    newAArr.push({ ...newState });
  }

  return newAArr;
}

module.exports = transformStateWithClones;
