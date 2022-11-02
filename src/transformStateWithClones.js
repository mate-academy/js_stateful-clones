'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayObject = [];
  const updateObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(updateObject, action.extraData);
        arrayObject.push({ ...updateObject });
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete updateObject[keyRemove];
        }

        arrayObject.push({ ...updateObject });
        break;

      case 'clear':
        for (const key in updateObject) {
          delete updateObject[key];
        }

        arrayObject.push({ ...updateObject });
    }
  }

  return arrayObject;
}

module.exports = transformStateWithClones;
