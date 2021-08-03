'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const temp = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        for (const i in obj.extraData) {
          temp[i] = obj.extraData[i];
        }
        states.push({ ...temp });
        break;

      case 'removeProperties':
        for (const i in obj.keysToRemove) {
          delete temp[obj.keysToRemove[i]];
        }
        states.push({ ...temp });
        break;

      default:
        for (const i in temp) {
          delete temp[i];
        }
        states.push({ ...temp });
    }
  }

  return states;
}

module.exports = transformStateWithClones;
