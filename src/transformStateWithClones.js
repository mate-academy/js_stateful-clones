'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const copyState = { ...state };
  const stateArray = [];

  for (const transformation of transforms) {
    switch (transformation.operation) {
      case 'addProperties':
        for (const key in transformation.properties) {
          copyState[key] = transformation.properties[key];
        }
        break;

      case 'removeProperties':
        for (const key of transformation.properties) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }
    stateArray.push({ ...copyState });
  }

  return stateArray;
}

module.exports = transformStateWithClones;
