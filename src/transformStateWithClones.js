'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const res = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      Object.assign(stateCopy, action.extraData);
      res.push({ ...stateCopy });
    } else if (action.type === 'removeProperties') {
      for (const keyToDel of action.keysToRemove) {
        delete stateCopy[keyToDel];
      } res.push({ ...stateCopy });
    } else if (action.type === 'clear') {
      for (const keyToDel in stateCopy) {
        delete stateCopy[keyToDel];
      } res.push({ ...stateCopy });
    }
  }

  return res;
}

module.exports = transformStateWithClones;
