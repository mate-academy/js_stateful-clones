'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let newObject = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObject, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newObject[key];
        }
        break;

      case 'clear':
        newObject = {};
        break;
    }
    stateHistory.push({ ...newObject });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
