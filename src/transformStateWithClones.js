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
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const keyToDel of action.keysToRemove) {
          delete stateCopy[keyToDel];
        }
        break;
      case 'clear':
        for (const keyToDel in stateCopy) {
          delete stateCopy[keyToDel];
        }
        break;
    }
    res.push({ ...stateCopy });
  }

  return res;
}

module.exports = transformStateWithClones;
