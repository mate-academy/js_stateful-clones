'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateClone = { ...state };
  const stateClones = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateClone, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateClone[key];
        }
        break;

      case 'clear':
        stateClone = {};
        break;

      default:

        return 'Something went worng with your inputs'
          + ', Please check and enter again';
    }
    stateClones.push({ ...stateClone });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
