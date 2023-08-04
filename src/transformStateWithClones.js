'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let firstCopyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        firstCopyState = {
          ...firstCopyState,
          ...action.extraData,
        };

        break;

      case 'removeProperties':
        const secondCopyState = { ...firstCopyState };

        for (const key of action.keysToRemove) {
          delete secondCopyState[key];
        }

        firstCopyState = secondCopyState;
        break;

      case 'clear':
        firstCopyState = {};
        break;

      default:
        break;
    }

    result.push({ ...firstCopyState });
  }

  return result;
}

module.exports = transformStateWithClones;
