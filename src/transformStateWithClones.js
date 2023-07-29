'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let myState = { ...state };
  const result = [];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      myState = {
        ...myState,
        ...obj.extraData,
      };
      result.push({ ...myState });
    }

    if (obj.type === 'removeProperties') {
      for (const toDelete of obj.keysToRemove) {
        delete myState[toDelete];
      }
      result.push({ ...myState });
    }

    if (obj.type === 'clear') {
      myState = {}; // Очищаємо myState
      result.push({ ...myState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
