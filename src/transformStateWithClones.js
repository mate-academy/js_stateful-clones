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

  for (const action of actions) {
    const { extraData, keysToRemove } = action;

    switch (action.type) {
      case 'addProperties':
        Object.assign(copyOfState, extraData);
        states.push({ ...copyOfState });
        break;

      case 'removeProperties':
        for (const item of keysToRemove) {
          delete copyOfState[item];
        }
        states.push({ ...copyOfState });
        break;

      case 'clear':
        for (const key of Object.keys(copyOfState)) {
          delete copyOfState[key];
        }
        states.push({ ...copyOfState });
        break;
    }
  }

  return states;
}

module.exports = transformStateWithClones;
