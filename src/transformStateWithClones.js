'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arrayStates = [];
  let previousState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    arrayStates.push(makeNextState(actions[i], previousState));
    previousState = { ...arrayStates[i] };
  }

  function makeNextState(action, prevState) {
    const newState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        return Object.assign(newState, action.extraData);

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        };

        return newState;

      case 'clear':
      default:
        return {};
    }
  }

  return arrayStates;
}

module.exports = transformStateWithClones;
