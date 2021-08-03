'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const temp = Object.assign({}, state);

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const i in obj.extraData) {
          temp[i] = obj.extraData[i];
        }
        arr.push({ ...temp });
        break;

      case 'removeProperties':
        for (const i in obj.keysToRemove) {
          delete temp[obj.keysToRemove[i]];
        }
        arr.push({ ...temp });
        break;

      default:
        for (const i in temp) {
          delete temp[i];
        }
        arr.push({ ...temp });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
