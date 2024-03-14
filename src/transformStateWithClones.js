'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const array = [];
  let result = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        result = { ...result, ...actions[i].extraData };
        break;
      case 'removeProperties':
        result = i === 0 ? result : { ...array[i - 1] };

        for (const key of actions[i].keysToRemove) {
          if (result[key]) {
            delete result[key];
          }
        }

        break;
      default:
        result = {};
        break;
    }

    array.push(result);
  }

  return array;
}

module.exports = transformStateWithClones;
