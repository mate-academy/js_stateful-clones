'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          newObject[key] = action.extraData[key];
        }
        result.push(newObject);
        newObject = { ...newObject };
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObject[key];
        }
        result.push(newObject);
        newObject = { ...newObject };
        break;

      case 'clear':
        for (const key in newObject) {
          delete newObject[key];
        }
        result.push(newObject);
        newObject = { ...newObject };
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
