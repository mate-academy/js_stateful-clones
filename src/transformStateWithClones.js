'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];

  for (let i = 0; i < actions.length; i++) {
    if (i === 0) {
      arr.push({ ...state });
    } else {
      arr.push({ ...arr[i - 1] });
    }

    switch (actions[i][`type`]) {
      case 'addProperties':
        for (const property in actions[i][`extraData`]) {
          arr[i][property] = actions[i][`extraData`][property];
        }
        break;

      case 'removeProperties':
        for (const property in actions[i][`keysToRemove`]) {
          if (Object.keys(arr[i]).includes(actions[i][`keysToRemove`][property])) {
            delete arr[i][actions[i][`keysToRemove`][property]];
          }
        }
        break;

      case 'clear':
        for (const stateKey in arr[i]) {
          delete arr[i][stateKey];
        }
        break;

      default:
        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
