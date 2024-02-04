'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const ADD_PROPERTY_KEY = 'addProperties';
  const REMOVE_PROPERTY_KEY = 'removeProperties';
  const CLEAR = 'clear';

  const states = [];
  let stateItem = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ADD_PROPERTY_KEY: {
        for (const key in action.extraData) {
          stateItem[key] = action.extraData[key];
        }

        break;
      }

      case REMOVE_PROPERTY_KEY: {
        for (const item of action.keysToRemove) {
          delete stateItem[item];
        }

        break;
      }

      case CLEAR: {
        for (const key in stateItem) {
          delete stateItem[key];
        }

        break;
      }
    }

    states.push(stateItem);

    stateItem = { ...stateItem };
  }

  return states;
}

module.exports = transformStateWithClones;
