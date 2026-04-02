'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let actualStateCopy = { ...state };
  const historyOfStates = [];

  for (const action of actions) {
    actualStateCopy = { ...actualStateCopy };

    switch (action.type) {
      case 'addProperties':
        Object.assign(actualStateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete actualStateCopy[key];
        }
        break;

      case 'clear':
        actualStateCopy = {};
        break;

      default:
        throw new Error('Unknown action');
    }

    historyOfStates.push(actualStateCopy);
  }

  return historyOfStates;
}

module.exports = transformStateWithClones;
