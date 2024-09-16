'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateObject = { ...state };
  const stateClones = [];

  for (const item of transforms) {
    switch (item.operation) {
      case 'addProperties' :
        for (const key in item.properties) {
          stateObject[key] = item.properties[key];
        }
        break;

      case 'removeProperties' :
        for (const key of item.properties) {
          delete stateObject[key];
        }
        break;

      case 'clear' :
        for (const key in stateObject) {
          delete stateObject[key];
        }
        break;
    }
    stateClones.push({ ...stateObject });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
