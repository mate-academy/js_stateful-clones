'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function deleteEntry(action, stateCopy) {
  for (const entry of Object.entries(action)) {
    for (const value of entry[1]) {
      delete stateCopy[value];
    }
  }
}

function transformStateWithClones(state, actions) {
  const allStates = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        deleteEntry(action, stateCopy);
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'Error. Something went wrong.';
    }

    allStates.push({ ...stateCopy });
  }

  return allStates;
}

module.exports = transformStateWithClones;
