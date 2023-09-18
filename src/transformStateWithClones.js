'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayOfStates = [];
  const stateCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties':
        const arrayToRemove = action.keysToRemove;

        for (const key of arrayToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':
        const arrayToDelete = Object.keys(stateCopy);

        for (const key of arrayToDelete) {
          delete stateCopy[key];
        }

        break;

      default:
        throw new Error('This action is not possible.');
    }

    arrayOfStates.push(Object.assign({}, stateCopy));
  }

  return arrayOfStates;
}

module.exports = transformStateWithClones;
