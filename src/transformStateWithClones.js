'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const clone = { ...state };
  const result = [];

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        Object.assign(clone, transforms[i].properties);
        result.push({ ...clone });
        break;
      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        result.push({ ...clone });
        break;
      case 'removeProperties':
        for (let j = 0; j < transforms[i].properties.length; j++) {
          delete clone[transforms[i].properties[j]];
        }
        result.push({ ...clone });
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
