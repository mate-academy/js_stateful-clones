'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clonesOfState = [];
  let stateCopy = { ...state };

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
        for (const member in stateCopy) {
          delete stateCopy[member];
        }

        break;

      default:

        break;
    }

    clonesOfState[i] = stateCopy;

    stateCopy = { ...clonesOfState[i] };
  }

  return clonesOfState;
}

module.exports = transformStateWithClones;
