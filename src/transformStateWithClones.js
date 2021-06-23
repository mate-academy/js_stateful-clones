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

  for (const action of actions) {
    switch (action.type) {
      case commandForAdd:
        Object.assign(copyOfState, action.extraData);
        break;

      case commandForRemove:
        for (const key of action.keysToRemove) {
          delete copyOfState[key];
        }
        break;

      case commandForClear:
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
    }
    states.push({ ...copyOfState });
  }

  return states;
}

module.exports = transformStateWithClones;
