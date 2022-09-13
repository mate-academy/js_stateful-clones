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
    if (object.type === 'addProperties') {
      newObject = Object.assign(newObject, object.extraData);

      result.push(Object.assign({}, newObject));
    }

    if (object.type === 'removeProperties') {
      for (const key of object.keysToRemove) {
        delete newObject[key];
      }
      result.push(Object.assign({}, newObject));
    }

    if (object.type === 'clear') {
      result.push({});

      newObject = {};
    }
  }

  return result;
}

module.exports = transformStateWithClones;
