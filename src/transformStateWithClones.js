'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const obj = { ...state };
  const arrayResult = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        (Object.assign(obj, action.extraData));
        break;

      case 'removeProperties':
        for (const value of action.keysToRemove) {
          delete obj[value];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
        break;
    }
    arrayResult.push({ ...obj });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
