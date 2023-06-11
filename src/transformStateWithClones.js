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
        initialState = {
          ...initialState,
          ...action.extraData,
        };

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete initialState[key];
        }

        break;

      case 'clear':
        initialState = {};

        break;

      default:
        throw new Error('Unexpected type');
    }

    statesArray.push({ ...initialState });
  }

  return statesArray;
}

module.exports = transformStateWithClones;
