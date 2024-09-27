'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const result = [];
  const newState = { ...state };

  for (let i = 0; i < transforms.length; i++) {
    if (transforms[i].operation === 'removeProperties') {
      for (const property of transforms[i].properties) {
        delete newState[property];
      }
    }

    if (transforms[i].operation === 'addProperties') {
      Object.assign(newState, transforms[i].properties);
    }

    if (transforms[i].operation === 'clear') {
      for (const key in newState) {
        delete newState[key];
      }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
