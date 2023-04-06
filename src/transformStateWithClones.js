'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyOfState = { ...state };
  const actionsUpgrade = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          copyOfState[key] = actions[i].extraData[key];
        }
        break;
      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete copyOfState[key];
        }
        break;
      case 'clear':
        for (const key in copyOfState) {
          delete copyOfState[key];
        }
        break;
      default:
        return 'Error';
    }
    actionsUpgrade.push({ ...copyOfState });
  }

  return actionsUpgrade;
}

module.exports = transformStateWithClones;
