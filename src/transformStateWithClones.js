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

  for (let i = 0; i < actions.length; i++) {
    const type = actions[i].type;

    switch (type) {
      case 'addProperties':
        Object.assign(modifiedStates, actions[i].extraData);
        statesArray.push({ ...modifiedStates });
        break;
      case 'removeProperties':
        for (let x = 0; x < actions[i].keysToRemove.length; x++) {
          delete modifiedStates[actions[i].keysToRemove[x]];
        };
        statesArray.push({ ...modifiedStates });
        break;
      case 'clear':
        for (const key in modifiedStates) {
          delete modifiedStates[key];
        };
        statesArray.push({ ...modifiedStates });
        break;
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
