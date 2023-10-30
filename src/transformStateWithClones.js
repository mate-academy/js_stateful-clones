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
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case add:
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case remove:
        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case clear:
        stateCopy = {};
        break;

      default:
        return 'Unknown action type';
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
