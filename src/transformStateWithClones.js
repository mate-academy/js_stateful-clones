'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const arrayResult = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        (Object.assign(stateCopy, action.extraData));
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete stateCopy[value];
        }
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
    }
    arrayResult.push({ ...stateCopy });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
