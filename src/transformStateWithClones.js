'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesArray = [];
  const modifiedStates = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(modifiedStates, extraData);
        break;
      case 'removeProperties':
        for (let x = 0; x < keysToRemove.length; x++) {
          delete modifiedStates[keysToRemove[x]];
        };
        break;
      case 'clear':
        for (const item in modifiedStates) {
          delete modifiedStates[item];
        };
        break;
      default:
        throw Error('There is no such action');
    }
    statesArray.push({ ...modifiedStates });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
