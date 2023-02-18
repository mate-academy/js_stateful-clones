'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  let statePrevious = { ...state };

  for (const action of actions) {
    const stateForFunction = transformActions(statePrevious, action);

    statePrevious = stateForFunction;
    stateHistory.push({ ...stateForFunction });
  }

  return stateHistory;
}

function transformActions(state, action) {
  const stateCopy = { ...state };

  switch (action.type) {
    case 'addProperties':
      return {
        ...stateCopy,
        ...action.extraData,
      };

    case 'removeProperties':
      for (const key of action.keysToRemove) {
        delete stateCopy[key];
      };

      return stateCopy;

    case 'clear':
      return {};

    default:
      throw new Error('Type correct action');
  }
}

module.exports = transformStateWithClones;
