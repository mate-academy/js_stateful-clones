'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const arr = [];

  for (let i = 0; i < transforms.length; i++) {
    switch (transforms[i].operation) {
      case 'addProperties':
        for (const prop in transforms[i].properties) {
          stateClone[prop] = transforms[i].properties[prop];
        };
        arr.push({ ...stateClone });
        break;
      case 'removeProperties':
        for (const prop in transforms[i].properties) {
          if (stateClone.hasOwnProperty(transforms[i].properties[prop])) {
            delete stateClone[transforms[i].properties[prop]];
          }
        }
        arr.push({ ...stateClone });
        break;
      case 'clear':
        for (const prop in stateClone) {
          if (stateClone.hasOwnProperty(prop)) {
            delete stateClone[prop];
          }
        }
        arr.push({ ...stateClone });
        break;
    }
  }

  return arr;
}
module.exports = transformStateWithClones;
