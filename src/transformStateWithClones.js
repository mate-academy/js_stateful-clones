'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const output = [];
  const stateClone = { ...state };

  for (const obj of transforms) {
    switch (obj['operation']) {
      case 'addProperties':
        for (const key in obj['properties']) {
          stateClone[key] = obj['properties'][key];
        }
        break;

      case 'removeProperties':
        for (const key of obj['properties']) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
    } // end of switch

    // if (obj['operation'] === 'addProperties') {
    //   for (const key in obj['properties']) {
    //     stateClone[key] = obj['properties'][key];
    //   }
    // }

    // if (obj['operation'] === 'removeProperties') {
    //   for (const key of obj['properties']) {
    //     delete stateClone[key];
    //   }
    // }

    // if (obj['operation'] === 'clear') {
    //   for (const key in stateClone) {
    //     delete stateClone[key];
    //   }
    // }

    output.push({ ...stateClone });
  }

  return output;
}

module.exports = transformStateWithClones;
