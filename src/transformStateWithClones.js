'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneObject = {};
  const arrayWithObjects = [];

  Object.assign(cloneObject, state);

  for (const objects of actions) {
    const { type, extraData, keysToRemove } = objects;

    switch (type) {
      case 'addProperties' :
        Object.assign(cloneObject, extraData);
        break;

      case 'removeProperties' :
        for (const deleteValue of keysToRemove) {
          delete cloneObject[deleteValue];
        }
        break;

      case 'clear' :
        for (const deleteAll in cloneObject) {
          delete cloneObject[deleteAll];
        }
        break;
    }
    arrayWithObjects.push({ ...cloneObject });
  }

  return arrayWithObjects;
}

module.exports = transformStateWithClones;
