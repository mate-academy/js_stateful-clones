'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const reducer = (reducerState, action) => {
    const changedState = { ...reducerState };

    switch (action.type) {
      case 'addProperties':
        return {
          ...reducerState,
          ...action.extraData,
        };
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete changedState[key];
        };

        return changedState;
      case 'clear':
        for (const key in changedState) {
          delete changedState[key];
        };

        return changedState;
      default:
        return 'There in no action like this';
    }
  };

  const modifiedStates = [];

  actions.reduce((reduceState, act) => {
    const modifiedState = reducer(reduceState, act);

    modifiedStates.push(modifiedState);

    return modifiedState;
  }, state);

  return modifiedStates;
}

module.exports = transformStateWithClones;
