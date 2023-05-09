'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const array = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);

        array.push({ ...copyState });

        break;

      case 'removeProperties':
        for (const ch of keysToRemove) {
          delete copyState[ch];
        }

        array.push({ ...copyState });

        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }

        array.push({ ...copyState });
        break;

      default:
        return 'Error';
    }
  }

  return array;
}

module.exports = transformStateWithClones;
