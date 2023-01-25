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

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties':
        Object.assign(modifiedStates, key.extraData);
        break;
      case 'removeProperties':
        for (let x = 0; x < key.keysToRemove.length; x++) {
          delete modifiedStates[key.keysToRemove[x]];
        };
        break;
      case 'clear':
        for (const item in modifiedStates) {
          delete modifiedStates[item];
        };
        break;
    }
    statesArray.push({ ...modifiedStates });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
