'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateCloneChanges = [];

  for (const key in actions) {
    const operationTypeObject = { ...actions[key] };

    for (const operationKey in operationTypeObject) {
      switch (operationTypeObject[operationKey]) {
        case 'addProperties': {
          addProperties(stateClone, operationTypeObject.extraData);
          getOperationArray(stateClone, stateCloneChanges);
          break;
        }

        case 'removeProperties': {
          removeProperties(stateClone, operationTypeObject.keysToRemove);
          getOperationArray(stateClone, stateCloneChanges);
          break;
        }

        case 'clear': {
          clearProperties(stateClone);
          getOperationArray(stateClone, stateCloneChanges);
          break;
        }
      }
    }
  }

  return stateCloneChanges;
}

function addProperties(state, extraData, array) {
  Object.assign(state, extraData);

  return state;
}

function removeProperties(state, extraData, array) {
  for (const removedKey of extraData) {
    delete state[removedKey];
  }

  return state;
}

function clearProperties(state, array) {
  for (const clearedKey in state) {
    delete state[clearedKey];
  }

  return state;
}

function getOperationArray(state, array) {
  array.push({ ...state });

  return array;
}

module.exports = transformStateWithClones;
