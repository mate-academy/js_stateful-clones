'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  let copyOfState = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        copyOfState = Object.assign(copyOfState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(keyToRemove => {
          delete copyOfState[keyToRemove];
        });
        break;

      case 'clear':
        copyOfState = {};
        break;

      default:
        copyOfState = 'error';
        break;
    }

    arrayOfStates.push({ ...copyOfState });
  });

  return arrayOfStates;
}

module.exports = transformStateWithClones;
