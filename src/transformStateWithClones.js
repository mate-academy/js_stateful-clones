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
        resultState.push(Object.assign({}, stateCopy, action.extraData));
        Object.assign(stateCopy, action.extraData);
        break;

      case (action.type === 'removeProperties'):
        action.keysToRemove.map(curr => {
          if (stateCopy.hasOwnProperty(curr)) {
            delete stateCopy[curr];
          }

          return stateCopy;
        });
        resultState.push(Object.assign({}, stateCopy));
        break;

      case (action.type === 'clear'):
        Object.getOwnPropertyNames(stateCopy).forEach(function(prop) {
          delete stateCopy[prop];
        });
        resultState.push({});
        break;

      default:
        return Error;
    }
  }

  return resultState;
}

module.exports = transformStateWithClones;
