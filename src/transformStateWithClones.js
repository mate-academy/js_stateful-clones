'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const resultState = [];

  for (const action of actions) {
    switch (true) {
      case (action.type === 'addProperties'):
        Object.assign(stateCopy, action.extraData);
        break;

      case (action.type === 'removeProperties'):
        action.keysToRemove.map(curr => {
          if (stateCopy.hasOwnProperty(curr)) {
            delete stateCopy[curr];
          }

          return stateCopy;
        });
        break;

      case (action.type === 'clear'):
        Object.getOwnPropertyNames(stateCopy).forEach(function(prop) {
          delete stateCopy[prop];
        });
        break;

      default:
        return Error;
    }

    resultState.push({ ...stateCopy });
  }

  return resultState;
}

module.exports = transformStateWithClones;
