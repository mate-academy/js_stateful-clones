'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR = 'clear';

function transformStateWithClones(state, actions) {
  let tempState = { ...state };
  const stateHistory = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case ADD_PROPERTIES:
        tempState = {
          ...tempState,
          ...extraData,
        };
        break;

      case REMOVE_PROPERTIES:
        for (const key of keysToRemove) {
          delete tempState[key];
        }
        break;

      case CLEAR:
        tempState = {};
        break;
    }

    stateHistory.push({ ...tempState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
