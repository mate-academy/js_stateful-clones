'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

const ADD = 'addProperties';
const REMOVE = 'removeProperties';
const CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE:
        for (const key of action.keysToRemove) {
          if (stateCopy.hasOwnProperty(key)) {
            delete stateCopy[key];
          }
        }
        break;

      case CLEAR:
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
