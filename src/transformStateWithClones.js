'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        // add all extraData props to the state
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties': {
        // remove all keysToRemove from the state
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;
      }

      case 'clear': {
        // remove all state keys from it
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        break;
      }
    }
    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
