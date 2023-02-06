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
  const res = [];
  const stateCopy = { ...state };

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
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;
      default:
        break;
    }
    res.push({ ...stateCopy });
  }

  return res;
}

module.exports = transformStateWithClones;
