'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const listOfStates = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const remove of keysToRemove) {
          delete copyState[remove];
        }
        break;

      case 'clear':
        for (const member in copyState) {
          delete copyState[member];
        }
    }
    listOfStates.push({ ...copyState });
  }

  return listOfStates;
}

module.exports = transformStateWithClones;
