'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObject = Object.assign({}, state);

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        newObject = Object.assign(newObject, object.extraData);
        result.push(Object.assign({}, newObject));

        break;

      case 'removeProperties':
        for (const key of object.keysToRemove) {
          delete newObject[key];
        }

        result.push(Object.assign({}, newObject));

        break;

      case 'clear':
        result.push({});
        newObject = {};

        break;

      default:
        return 'Wrong type';
    }
  }

  return result;
}

module.exports = transformStateWithClones;
