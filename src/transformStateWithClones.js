'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let copyOfState = { ...state };

  for (const actionsValue of actions) {
    switch (actionsValue.type) {
      case 'clear':
        copyOfState = {};
        break;

      case 'addProperties':
        Object.assign(copyOfState, actionsValue.extraData);
        break;

      case 'removeProperties':
        for (const item of actionsValue.keysToRemove) {
          delete copyOfState[item];
        }
        break;
    }
    result.push({ ...copyOfState });
  }

  return result;
}

module.exports = transformStateWithClones;
