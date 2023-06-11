'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let initialState = { ...state };
  const statesArray = [];

  for (const action of actions) {
    reducer(action);
  }

  function reducer(action) {
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          initialState[key] = action.extraData[key];
        }

        statesArray.push({ ...initialState });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete initialState[key];
        }

        statesArray.push({ ...initialState });

        break;

      case 'clear':
        initialState = {};

        statesArray.push({ ...initialState });

        break;

      default:
        throw new Error('Unexpected type');
    }
  }

  return statesArray;
}

module.exports = transformStateWithClones;
