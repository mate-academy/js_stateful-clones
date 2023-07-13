'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  actions.forEach((item) => {
    const copyState = result.length
      ? { ...result[result.length - 1] }
      : { ...state };

    switch (item.type) {
      case 'addProperties':
        Object.assign(copyState, item.extraData);
        break;
      case 'clear':
        Object.keys(copyState).forEach((key) => delete copyState[key]);
        break;
      case 'removeProperties':
        item.keysToRemove.forEach((key) => {
          delete copyState[key];
        });
        break;
      default:
        break;
    }
    result.push(copyState);
  });

  return result;
}

module.exports = transformStateWithClones;
