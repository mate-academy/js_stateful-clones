'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const instuction = Object.assign(actions);
  const loopResult = { ...state };

  for (let i = 0; i < instuction.length; i++) {
    switch (instuction[i].type) {
      case 'addProperties':
        for (const key in instuction[i].extraData) {
          loopResult[key] = instuction[i].extraData[key];
        }
        result.push({ ...loopResult });
        break;

      case 'removeProperties':
        for (const key of instuction[i].keysToRemove) {
          delete loopResult[key];
        }
        result.push({ ...loopResult });
        break;

      case 'clear':
        for (const key in loopResult) {
          delete loopResult[key];
        }
        result.push({ ...loopResult });
        break;

      default:
        return 'Sorry, but you entered values that are not as expected';
    }
  }

  return result;
}

module.exports = transformStateWithClones;
