'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  const changedState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(changedState, action.extraData);
        addChangedStateToResult(changedState, resultStates);
        break;
      case 'removeProperties':
        removeProperties(changedState, action.keysToRemove);
        addChangedStateToResult(changedState, resultStates);
        break;
      case 'clear':
        clear(changedState);
        addChangedStateToResult(changedState, resultStates);
        break;
      default:
        break;
    }
  }

  return resultStates;

  function addProperties(stateObject, extraData) {
    Object.assign(stateObject, extraData);
  }

  function removeProperties(stateObject, keysToRemove) {
    for (const key of keysToRemove) {
      delete stateObject[key];
    }
  }

  function clear(stateObject) {
    for (const key in stateObject) {
      delete stateObject[key];
    }
  }

  function addChangedStateToResult(changed, result) {
    const copy = { ...changed };

    result.push(copy);
  }
}

module.exports = transformStateWithClones;
