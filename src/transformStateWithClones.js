'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = {
    ...state,
  };

  const newActions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(copyState, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(copyState, action.keysToRemove);
        break;
      case 'clear':
        clear(copyState);
        break;
    }

    newActions.push({
      ...copyState,
    });
  }

  return newActions;
}

function addProperties(copyState, extraData) {
  Object.assign(copyState, extraData);
};

function removeProperties(copyState, keysToRemove) {
  for (const key of keysToRemove) {
    delete copyState[key];
  }
}

function clear(copyState) {
  Object.keys(copyState).forEach(key => delete copyState[key]);
}

module.exports = transformStateWithClones;
