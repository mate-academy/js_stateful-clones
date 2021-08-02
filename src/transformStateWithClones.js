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

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(temp, actions[i].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete temp[key];
        }

        break;

      case 'clear':
        for (const element in temp) {
          delete temp[element];
        }

        break;

      default:
        break;
    }

    result[i] = temp;
    temp = { ...result[i] };
  }

  return result;
}

module.exports = transformStateWithClones;
