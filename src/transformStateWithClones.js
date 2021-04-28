'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const transformedClone = [];
  let transformedObject = { ...state };

  for (const { properties, operation } of transforms) {
    switch (operation) {
      case 'addProperties' :
        transformedObject = {
          ...transformedObject, ...properties,
        };
        break;
      case 'removeProperties' :

        for (const removeProperty of properties) {
          delete transformedObject[removeProperty];
        }
        break;
      case 'clear' :
        transformedObject = {};
        break;
      default:
        return null;
    }
    transformedClone.push({ ...transformedObject });
  }

  return transformedClone;
}

module.exports = transformStateWithClones;
