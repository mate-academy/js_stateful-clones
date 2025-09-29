'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultOfEachAction = [];
  const copyState = { ...state };

  actions.forEach((action) => {
    let stateForChange = resultOfEachAction.at(-1)
      ? { ...resultOfEachAction.at(-1) }
      : { ...copyState };

    switch (action.type) {
      case 'addProperties':
        addProperties(action, stateForChange);
        break;
      case 'removeProperties':
        removeProperties(action, stateForChange);
        break;
      case 'clear':
        stateForChange = {};
        break;
      default:
        throw new Error('Unknown action type: ' + action.type);
    }

    resultOfEachAction.push(stateForChange);
  });

  function addProperties(action, initialState) {
    const { extraData } = action;

    Object.assign(initialState, extraData);
  }

  function removeProperties(action, initialState) {
    const { keysToRemove = [] } = action;

    keysToRemove.forEach((key) => delete initialState[key]);
  }

  return resultOfEachAction;
}

module.exports = transformStateWithClones;
