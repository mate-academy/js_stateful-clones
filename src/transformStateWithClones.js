'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const add = 'addProperties';
  const remove = 'removeProperties';
  const clear = 'clear';
  const stateCopy = { ...state };
  const newState = [];

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(stateCopy, action.extraData);
        break;
      case remove:
        for (const key of action.keysToRemove) {
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
