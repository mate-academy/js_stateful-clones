'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const loopResult = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const key in actions[i].extraData) {
          loopResult[key] = actions[i].extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete loopResult[key];
        }
        break;

      case 'clear':
        for (const key in loopResult) {
          delete loopResult[key];
        }
        break;

      default:
        return 'Sorry, but you entered values that are not as expected';
    }
    result.push({ ...loopResult });
  }

  return result;
}

module.exports = transformStateWithClones;
