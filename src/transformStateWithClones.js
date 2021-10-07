'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const alteredState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(alteredState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach(key => {
          delete alteredState[key];
        });
        break;

      case 'clear':
        for (const key in alteredState) {
          delete alteredState[key];
        }
        break;

      default:
        return 'Error: no actions';
    }

    result.push({ ...alteredState });
  }

  return result;
}

module.exports = transformStateWithClones;
