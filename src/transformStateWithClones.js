'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const newObj = Object.assign({}, state);

  for (const property of actions) {
    switch (property.type) {
      case 'addProperties':
        Object.assign(newObj, property.extraData);
        break;

      case 'removeProperties':
        for (const key of property.keysToRemove) {
          delete newObj[key];
        }
        break;

      case 'clear':
        for (const key in newObj) {
          delete newObj[key];
        }
        break;
    }

    arr.push(Object.assign({}, newObj));
  }

  return arr;
}

module.exports = transformStateWithClones;
