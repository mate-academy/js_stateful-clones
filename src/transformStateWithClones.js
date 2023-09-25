'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const stateSteps = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }

        break;

      case 'clear':
        for (const key of Object.keys(stateCopy)) {
          delete stateCopy[key];
        }

        break;
    }

    stateSteps.push({ ...stateCopy });
  }

  return stateSteps;
}

module.exports = transformStateWithClones;
