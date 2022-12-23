'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const objState = { ...state };

  for (const toDo of actions) {
    if (toDo.type === 'addProperties') {
      Object.assign(objState, toDo.extraData);
      result.push({ ...objState });
    }

    if (toDo.type === 'removeProperties') {
      for (const item of toDo.keysToRemove) {
        delete objState[item];
      }
      result.push({ ...objState });
    }

    if (toDo.type === 'clear') {
      for (const key in objState) {
        delete objState[key];
      }
      result.push({ ...objState });
    }
  }

  return result;
}

module.exports = transformStateWithClones;
