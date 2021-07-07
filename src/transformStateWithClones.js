'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultValue = [];
  const stateClone = { ...state };

  for (const transform of transforms) {
    switch (transform.operation) {
      case 'addProperties':
        Object.assign(stateClone, transform.properties);
        break;
      case 'removeProperties':
        for (const propDelete of transform.properties) {
          delete stateClone[propDelete];
        }
        break;
      case 'clear':
        for (const stateClear in stateClone) {
          delete stateClone[stateClear];
        }
        break;
    }

    resultValue.push({ ...stateClone });
  }

  return resultValue;
}

module.exports = transformStateWithClones;
