'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const clonedArrState = [];
  const newState = { ...state };

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        for (const key in transforms[i].properties) {
          newState[key] = transforms[i].properties[key];
        }
        break;

      case 'removeProperties':
        for (let k = 0; k < transforms[i].properties.length; k++) {
          delete newState[transforms[i].properties[k]];
        }
        break;

      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;

      default:
    }
    clonedArrState.push({ ...newState });
  }

  return clonedArrState;
}

module.exports = transformStateWithClones;
