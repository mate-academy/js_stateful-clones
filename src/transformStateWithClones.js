'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = { ...state };
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';

  for (const action of actions) {
    switch (action.type) {
      case ADD:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case CLEAR:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
