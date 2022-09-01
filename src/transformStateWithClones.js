'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const arrActions = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...newState,
          ...act.extraData,
        };
        break;

      case 'removeProperties':
        for (const remKey of act.keysToRemove) {
          delete newState[remKey];
        }
        break;

      default:
        break;
    }
    arrActions.push({ ...newState });
  }

  return arrActions;
}

module.exports = transformStateWithClones;
