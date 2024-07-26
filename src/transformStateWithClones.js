'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newStates = [];
  let stateCopy = { ...state }; // renamed

  for (const action of actions) {
    // instead of if used switch
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;

      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default: // Add a default case that handles unexpected action types
        break;
    }

    newStates.push(stateCopy);
  }

  return newStates;
}

module.exports = transformStateWithClones;
