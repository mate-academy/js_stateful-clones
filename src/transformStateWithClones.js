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
  const res = [];
  const stateCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case add:
        Object.assign(stateCopy, action.extraData);
        res.push(Object.assign({}, stateCopy));
        break;
      case remove:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        res.push(Object.assign({}, stateCopy));
        break;
      default:
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        res.push({});
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
