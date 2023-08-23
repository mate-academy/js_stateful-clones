'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateFinish = [];
  let currentState = { ...state };

  for (const obj of actions) {
    const { type, extraData, keysToRemove } = obj;
    const ADD_PROPERTIES = 'addProperties';
    const REMOVE_PROPERTIES = 'removeProperties';
    const CLEAR = 'clear';

    switch (type) {
      case ADD_PROPERTIES:
        currentState = {
          ...currentState, ...extraData,
        };
        break;

      case REMOVE_PROPERTIES:
        keysToRemove.forEach(key => delete currentState[key]);
        break;

      case CLEAR:
        currentState = {};
        break;
    }

    stateFinish.push({ ...currentState });
  }

  return stateFinish;
}

module.exports = transformStateWithClones;
