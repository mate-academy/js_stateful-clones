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
    const type = key.type;

    switch (type) {
      case 'addProperties':
        Object.assign(modifiedStates, key.extraData);
        statesArray.push({ ...modifiedStates });
        break;
      case 'removeProperties':
        for (let x = 0; x < key.keysToRemove.length; x++) {
          delete modifiedStates[key.keysToRemove[x]];
        };
        statesArray.push({ ...modifiedStates });
        break;
      case 'clear':
        for (const item in modifiedStates) {
          delete modifiedStates[item];
        };
        statesArray.push({ ...modifiedStates });
        break;
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
