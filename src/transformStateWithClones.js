'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  const dynamicObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(dynamicObject, action.extraData);
        break;

      case 'removeProperties':
        for (const removeKey of action.keysToRemove) {
          delete dynamicObject[removeKey];
        }
        break;

      case 'clear':
        for (const key in dynamicObject) {
          delete dynamicObject[key];
        }
        break;
    }
    arrayResult.push({ ...dynamicObject });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
