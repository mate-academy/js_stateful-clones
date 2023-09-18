'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultsOfEachAction = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        for (const key in action.extraData) {
          stateCopy[key] = action.extraData[key];
        }
        break;

      case action.type === 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case action.type === 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      default :
        throw new Error('This is not a command!');
    }

    resultsOfEachAction.push({ ...stateCopy });
  }

  return resultsOfEachAction;
}

module.exports = transformStateWithClones;
