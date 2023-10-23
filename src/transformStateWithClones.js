'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let loopResult = { ...state };

  for (let i = 0; i < actions.length; i++) {
    const { extraData, keysToRemove } = actions[i];

    switch (actions[i].type) {
      case 'addProperties':
        loopResult = Object.assign({}, loopResult, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
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
