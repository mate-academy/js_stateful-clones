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
  let clone = { ...state };

  for (const key in transforms) {
    switch (transforms[key].operation) {
      case 'addProperties':
        Object.assign(clone, transforms[key].properties);
        break;

      case 'removeProperties':

        for (const prop of transforms[key].properties) {
          delete clone[prop];
        }
        break;

      case 'clear':
        clone = {};
    }

    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
