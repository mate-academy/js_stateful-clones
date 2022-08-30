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
        arrActions.push({ ...newState });
        break;

      case 'addProperties':
        newState = {
          ...newState,
          ...act.extraData,
        };

        arrActions.push({ ...newState });
        break;

      case 'removeProperties':
        for (const remKey of act.keysToRemove) {
          delete newState[remKey];
        }

        arrActions.push({ ...newState });

        break;

      default:
        break;
    }
  }

  return arrActions;
}

module.exports = transformStateWithClones;
