'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultStates = [];
  let currentState = { ...state };

  actions.forEach(({ type, extraData, keysToRemove }) => {
    switch (type) {
      case 'addProperties':
        currentState = Object.assign(currentState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => delete currentState[key]);
        break;

      case 'clear':
        currentState = {};
        break;
    }
    resultStates.push({ ...currentState });
  });

  return resultStates;
}

module.exports = transformStateWithClones;
