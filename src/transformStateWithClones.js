'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const add = 'addProperties';
const remove = 'removeProperties';
const clear = 'clear';

function transformStateWithClones(state, actions) {
  const result = [];
  let copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case add:
        for (const key in action.extraData) {
          copy[key] = action.extraData[key];
        }
        break;

      case remove:
        for (const key of action.keysToRemove) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
        }
        break;

      case clear:
        copy = {};
        break;

      default:
        return 'Unknown action type';
    }

    result.push({ ...copy });
  }

  return result;
}

module.exports = transformStateWithClones;
