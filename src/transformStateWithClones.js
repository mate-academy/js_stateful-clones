'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  let copyOfState = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(copyOfState, actions[i].extraData);
        break;

      case 'removeProperties':
        actions[i].keysToRemove.forEach((el) => delete copyOfState[el]);
        break;

      case 'clear':
        Object.keys(copyOfState).forEach((key) => delete copyOfState[key]);
        break;
      default:
        throw new Error(`Error`);
    }

    states.push({ ...copyOfState });
    copyOfState = { ...copyOfState };
  }

  return states;
}

module.exports = transformStateWithClones;
