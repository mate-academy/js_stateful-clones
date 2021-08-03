'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesOfState = [];
  const stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[i].extraData);

        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        break;

      default:

        break;
    }

    clonesOfState.push({ ...stateCopy });
  }

  return clonesOfState;
}

module.exports = transformStateWithClones;
