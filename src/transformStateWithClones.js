'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateSteps = [];
  let stateCopy = { ...state };

  for (let item = 0; item < actions.length; item++) {
    switch (actions[item].type) {
      case 'addProperties':
        Object.assign(stateCopy, actions[item].extraData);

        break;

      case 'removeProperties':

        for (const key of actions[item].keysToRemove) {
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

    stateSteps.push(stateCopy);
    stateCopy = { ...stateSteps[item] };
  }

  return stateSteps;
}

module.exports = transformStateWithClones;
