'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const reducer = (reducerState, action) => {
    switch (action.type) {
      case 'addProperties':
        return {
          ...reducerState,
          ...action.extraData,
        };
      case 'removeProperties':
        const updatedState = action.keysToRemove.reduce((object, key) => {
          const { [key]: _, ...p } = object;

          return p;
        }, reducerState);

        return updatedState;
      case 'clear':
        return {};
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
