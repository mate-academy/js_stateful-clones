'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrState = [];
  let newState = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        newState = {};
        break;

      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete newState[key]);
        break;

      case 'addProperties':
        newState = {
          ...newState,
          ...action.extraData,
        };
        break;

      default:
        break;
    }
    arrState.push({ ...newState });
  });

  return arrState;
}

module.exports = transformStateWithClones;
