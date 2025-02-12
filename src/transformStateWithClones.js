'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = Object.assign({}, state);
  const recievedStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    recievedStates.push({ ...stateCopy });
  }

  return recievedStates;
}

module.exports = transformStateWithClones;
