'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const newArray = [];

  for (const act of actions) {
    if (act.type === 'addProperties') {
      for (const addItem in act.extraData) {
        newState[addItem] = act.extraData[addItem];
      }
    }

    if (act.type === 'removeProperties') {
      for (const removeItem of act.keysToRemove) {
        delete newState[removeItem];
      }
    }

    if (act.type === 'clear') {
      for (const st in newState) {
        delete newState[st];
      }
    }

    newArray.push({ ...newState });
  }

  return newArray;
}

module.exports = transformStateWithClones;
