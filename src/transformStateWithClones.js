'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = Object.assign({}, state);
  const arrayOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete cloneState[property];
        };

        break;

      case 'clear':
        Object.keys(cloneState).forEach(key => delete cloneState[key]);
        break;

      default:
        break;
    }

    arrayOfStates.push({ ...cloneState });
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
