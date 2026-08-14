'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultArray = [];
  let currentState = state;

  for (const action of actions) {
    let stateCopy;

    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...currentState, ...action.extraData };
        break;

      case 'removeProperties':
        stateCopy = { ...currentState };

        for (const keyToRemove of action.keysToRemove ?? []) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        stateCopy = { ...currentState };
        break;
    }

    currentState = stateCopy;
    resultArray.push(currentState);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
