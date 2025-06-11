'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const stateHistorie = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (let i = 0; i < action.keysToRemove.length; i++) {
          delete stateCopy[action.keysToRemove[i]];
        }

        break;

      case 'clear':
        stateCopy = {};

        break;
    }
    stateHistorie.push({ ...stateCopy });
  }

  // Return the history of states
  return stateHistorie;
}

module.exports = transformStateWithClones;
