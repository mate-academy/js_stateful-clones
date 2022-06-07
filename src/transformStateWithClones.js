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

  for (const prop of actions) {
    switch (prop.type) {
      case 'addProperties':
        (Object.assign(obj, prop.extraData));
        break;

      case 'removeProperties':
        for (const value of prop.keysToRemove) {
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
