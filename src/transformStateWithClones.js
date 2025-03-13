'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const changesToState = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'clear':
        stateCopy = {};
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      default:
    }

    changesToState.push({ ...stateCopy });
  }

  return changesToState;
}

module.exports = transformStateWithClones;
