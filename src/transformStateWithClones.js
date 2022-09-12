'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const reducer = (_state, action) => {
    switch (action.type) {
      case 'addProperties':
        return {
          ..._state,
          ...action.extraData,
        };
      case 'removeProperties':
        const updatedState = action.keysToRemove.reduce((object, key) => {
          const { [key]: _, ...p } = object;

          return p;
        }, _state);

        return updatedState;
      case 'clear':
        return {};
      default:
        break;
    }
  };

  const modifiedStates = [];

  actions.reduce((__state, act) => {
    const modifiedState = reducer(__state, act);

    modifiedStates.push(modifiedState);

    return modifiedState;
  }, state);

  return modifiedStates;
}

module.exports = transformStateWithClones;
