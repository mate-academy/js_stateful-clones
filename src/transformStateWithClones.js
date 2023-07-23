'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete stateCopy[prop];
        }
        break;

      case 'clear':
        for (const prop in stateCopy) {
          delete stateCopy[prop];
        }
        break;
    }
    stateArr.push({ ...stateCopy });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
