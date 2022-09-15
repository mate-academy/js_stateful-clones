'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let copyState = {
    ...state,
  };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addPropertiesFunc(copyState, action.extraData, stateHistory);
        break;

      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove, stateHistory);
        break;

      case 'clear':
        copyState = {};

        stateHistory.push(
          {
            ...copyState,
          }
        );
        break;
    }
  }

  return stateHistory;
}

function addPropertiesFunc(copyState, addedData, stateHistory) {
  Object.assign(copyState, addedData);

  stateHistory.push(
    {
      ...copyState,
      ...addedData,
    }
  );
}

function removeProperties(copyState, keysToRemove, stateHistory) {
  for (const key of keysToRemove) {
    delete copyState[key];
  }

  stateHistory.push(
    {
      ...copyState,
    }
  );
}

module.exports = transformStateWithClones;
