'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const arr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = {
          ...stateCopy,
          ...action.extraData,
        };
        break;
      case 'removeProperties':
        for (const toRemoveKey of action.keysToRemove) {
          delete stateCopy[toRemoveKey];
        }
        break;
      case 'clear':
        stateCopy = {};
        break;
    }
    arr.push({ ...stateCopy });
  }

  return arr;
}

module.exports = transformStateWithClones;
