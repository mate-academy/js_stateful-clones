'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = JSON.parse(JSON.stringify(state));
  const result = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.entries(action.extraData).forEach(([key, val]) => {
          copyState[key] = val;
        });
        break;
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete copyState[key]);
        break;
      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
      default:
    }

    result.push(JSON.parse(JSON.stringify(copyState)));
  });

  return result;
}

module.exports = transformStateWithClones;
