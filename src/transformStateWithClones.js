'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const object = { ...state };
  const array = [];

  for (const data of actions) {
    switch (data.type) {
      case 'addProperties':
        Object.assign(object, data.extraData);
        break;

      case 'removeProperties':
        for (const value of data.keysToRemove) {
          delete object[value];
        }
        break;

      case 'clear':
        for (const value in object) {
          delete object[value];
        }
        break;
    }
    array.push({ ...object });
  }

  return array;
}

module.exports = transformStateWithClones;
