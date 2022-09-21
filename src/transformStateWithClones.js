'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];

  for (const currentAction of actions) {
    const currentState = stateHistory[stateHistory.length - 1] || { ...state };

    const nextState = changeState(currentState, currentAction);

    stateHistory.push(nextState);
  }

  return stateHistory;
}

const changeState = (currentState, currentAction) => {
  const currentStateCopy = { ...currentState };

  switch (currentAction.type) {
    case 'addProperties':
      return {
        ...currentStateCopy,
        ...currentAction.extraData,
      };

    case 'removeProperties':
      currentAction.keysToRemove.forEach((item) => {
        delete currentStateCopy[item];
      });

      return currentStateCopy;

    case 'clear':
      return {};

    default:
      return currentState;
  }
};

module.exports = transformStateWithClones;
