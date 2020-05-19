'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  // write code here

  const arrResult = [];
  const cloneState = {
    ...state,
  };

  for (const key of transforms) {
    if (key.operation === 'addProperties') {
      for (const keyAdd in key.properties) {
        cloneState[keyAdd] = key.properties[keyAdd];
      };
    }

    if (key.operation === 'removeProperties') {
      for (const keyRemove in key.properties) {
        delete cloneState[key.properties[keyRemove]];
      }
    }

    if (key.operation === 'clear') {
      for (const keyRemove in cloneState) {
        delete cloneState[keyRemove];
      }
    }

    arrResult.push({
      ...cloneState,
    });
  }

  return arrResult;
}

module.exports = transformStateWithClones;
