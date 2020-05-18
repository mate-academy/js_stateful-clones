'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const stateWithClones = [];
  const stateObject = { ...state };

  for (const obj of transforms) {
    switch (obj.operation) {
      case 'addProperties':
        for (const key in obj.properties) {
          stateObject[key] = obj.properties[key];
        }
        break;

      case 'removeProperties':
        for (const key of obj.properties) {
          delete stateObject[key];
        }
        break;

      case 'clear':
        for (const key in stateObject) {
          delete stateObject[key];
        }
        break;
    }
    stateWithClones.push({ ...stateObject });
  }

  return stateWithClones;
}

module.exports = transformStateWithClones;
