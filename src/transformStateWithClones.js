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
    if (action.type === 'addProperties') {
      Object.assign(updateObject, action.extraData);
      arrayObject.push({ ...updateObject });
    } else if (action.type === 'removeProperties') {
      for (const keyRemove of action.keysToRemove) {
        delete updateObject[keyRemove];
      }
      arrayObject.push({ ...updateObject });
    } else if (action.type === 'clear') {
      for (const key in updateObject) {
        delete updateObject[key];
      }

      const time = { ...updateObject };

      arrayObject.push(time);
    }
  }

  return arrayObject;
}

module.exports = transformStateWithClones;
