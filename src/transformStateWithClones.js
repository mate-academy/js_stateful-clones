'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = Object.assign({}, state);
  const allSteps = [];

  function doAction(modState, types, action) {
    switch (types) {
      case 'addProperties':
        addProperties(modState, action.extraData);
        allSteps.push({ ...modState });
        break;

      case 'removeProperties':
        removeProperties(modState, action.keysToRemove);
        allSteps.push({ ...modState });
        break;

      case 'clear':
        clear(modState);
        allSteps.push({ ...modState });
        break;
    }
  }

  function addProperties(modObject, data) {
    Object.assign(modObject, data);
  }

  function removeProperties(modObject, keys) {
    for (const key of keys) {
      delete modObject[key];
    }
  }

  function clear(modObject) {
    const keys = Object.keys(modObject);

    for (const key of keys) {
      delete modObject[key];
    }
  }

  for (const action of actions) {
    doAction(stateCopy, action.type, action);
  }

  return allSteps;
}

module.exports = transformStateWithClones;
