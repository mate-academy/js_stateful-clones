'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateV2 = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties' :
        Object.assign(stateV2, actions[i].extraData);
        break;
      case 'removeProperties' :
        for (const key of actions[i].keysToRemove) {
          delete stateV2[key];
        }

        break;

      case 'clear':
        for (const key in stateV2) {
          delete stateV2[key];
        }

        break;
    }
    result.push({ ...stateV2 });
  }

  return result;
}
module.exports = transformStateWithClones;
