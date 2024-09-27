'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  const copyState = { ...state };

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        for (const key in transforms[i].properties) {
          copyState[key] = transforms[i].properties[key];
        }
        break;

      case 'removeProperties':
        for (const key in transforms[i].properties) {
          delete copyState[transforms[i].properties[key]];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }

    arr.push({ ...copyState });
  }

  return arr;
}

module.exports = transformStateWithClones;
