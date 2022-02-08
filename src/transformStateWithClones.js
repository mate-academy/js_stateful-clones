'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let temp = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        temp = Object.assign(temp, action.extraData);
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
    }
    result.push({ ...temp });
  }

  return result;
}

module.exports = transformStateWithClones;
