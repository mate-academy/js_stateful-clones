'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const arr = [];
  const temp = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(temp, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temp[key];
        }
        break;
      case 'clear':
        for (const key in temp) {
          delete temp[key];
        }
        break;
      default:
        break;
    }
    arr.push({ ...temp });
  }

  return arr;
};

module.exports = transformStateWithClones;
