'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let currentStateCopy = structuredClone(state);
  const resultArray = [];

  for (const action of actions) {
    let updatedState = structuredClone(currentStateCopy);

    switch (action.type) {
      case 'clear':
        updatedState = {};
        break;

      case 'addProperties':
        Object.assign(updatedState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete updatedState[key];
        }
        break;

      default:
        return `Error! Unknown action type: ${action.type}`;
    }

    resultArray.push(updatedState);
    currentStateCopy = updatedState;
  }

  return resultArray;
}

module.exports = transformStateWithClones;
