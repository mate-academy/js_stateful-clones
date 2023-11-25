'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_TYPES = {
    clear: 'clear',
    removeProp: 'removeProperties',
    addProp: 'addProperties',
  };
  const ERROR_MESSAGE = 'Unexpected action!';
  const stateHistory = [];

  actions.forEach((action) => {
    const { type, extraData, keysToRemove } = action;
    const currStateCopy = stateHistory.length > 0
      ? { ...stateHistory[stateHistory.length - 1] }
      : { ...state };

    let newState = {};

    switch (type) {
      case ACTION_TYPES.clear:
        break;

      case ACTION_TYPES.removeProp:
        for (const key in currStateCopy) {
          if (!keysToRemove.includes(key)) {
            newState = {
              ...newState,
              [key]: currStateCopy[key],
            };
          }
        }
        break;

      case ACTION_TYPES.addProp:
        newState = {
          ...currStateCopy,
          ...extraData,
        };
        break;

      default:
        throw new Error(ERROR_MESSAGE);
    }

    stateHistory.push({ ...newState });
  });

  return stateHistory;
}

module.exports = transformStateWithClones;
