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

  for (const value of actions) {
    if (value.type === 'addProperties') {
      Object.assign(stateCopy, value.extraData);
      res.push({ ...stateCopy });
    } else if (value.type === 'removeProperties') {
      for (const keyToDel of value.keysToRemove) {
        delete stateCopy[keyToDel];
      } res.push({ ...stateCopy });
    } else if (value.type === 'clear') {
      for (const keyToDel in stateCopy) {
        delete stateCopy[keyToDel];
      } res.push({ ...stateCopy });
    }
  }

  return res;
}

module.exports = transformStateWithClones;
