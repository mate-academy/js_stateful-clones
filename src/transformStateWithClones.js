'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  actions.map(({ type, keysToRemove, extraData }) => {
    switch (type) {
      case 'clear':
        Object.keys(copyState).forEach(key => delete copyState[key]);
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => copyState[key] && delete copyState[key]);
        break;

      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      default:
        break;
    }

    result.push({ ...copyState });
  });

  return result;
}

module.exports = transformStateWithClones;
