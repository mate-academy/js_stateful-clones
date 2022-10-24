'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copiedState = { ...state };
  const listOfStates = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copiedState, action.extraData);

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copiedState[key];
        }

        break;

      case 'clear':
        for (const key in copiedState) {
          delete copiedState[key];
        }

        break;

      default:
        throw new Error('Wrong type of transformState');
    }

    listOfStates.push({ ...copiedState });
  }

  return listOfStates;
}

module.exports = transformStateWithClones;
