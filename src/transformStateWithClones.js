'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const copyOfState = { ...state };
  const commandForAdd = 'addProperties';
  const commandForRemove = 'removeProperties';
  const commandForClear = 'clear';

  for (const element of actions) {
    if (element.type === commandForAdd) {
      Object.assign(copyOfState, element.extraData);
    }

    if (element.type === commandForRemove) {
      for (const key of element.keysToRemove) {
        delete copyOfState[key];
      }
    }

    if (element.type === commandForClear) {
      for (const key in copyOfState) {
        delete copyOfState[key];
      }
    }

    states.push({ ...copyOfState });
  }

  return states;
}

module.exports = transformStateWithClones;
