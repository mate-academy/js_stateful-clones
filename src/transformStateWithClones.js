'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';
  const stateCopy = { ...state };
  const newState = [];

  for (const { type, extraData, keysToRemove } of actions) {
    switch (type) {
      case add:
        Object.assign(stateCopy, extraData);
        break;
      case remove:
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;
      case clear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    newState.push({ ...stateCopy });
  }

  return newState;
}

module.exports = transformStateWithClones;
