'use strict';

/**
 * @param {Object} state
 * @param {Object[]} transforms
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const result = [];
  const newState = { ...state };

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'removeProperties':
        for (const property of transforms[i].properties) {
          delete newState[property];
        }
        break;
      case 'addProperties' :
        Object.assign(newState, transforms[i].properties);
        break;
      case 'clear':
        for (const key in newState) {
          delete newState[key];
        }
        break;
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
