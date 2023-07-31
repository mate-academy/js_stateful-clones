'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const copyOfState = { ...state };

  const finiteStateMachine = ({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        Object.assign(copyOfState, extraData);

        return { ...copyOfState };

      case 'removeProperties':
        keysToRemove.forEach(keyToRemove => {
          delete copyOfState[keyToRemove];
        });

        return { ...copyOfState };

      case 'clear':
        Object.keys(copyOfState).forEach(keyToRemove => {
          delete copyOfState[keyToRemove];
        });

        return { ...copyOfState };

      default:
        break;
    }
  };

  actions.forEach(action => {
    arrayOfStates.push(finiteStateMachine(action));
  });

  return arrayOfStates;
}

module.exports = transformStateWithClones;
