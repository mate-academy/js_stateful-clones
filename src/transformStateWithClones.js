'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        keysToRemove.forEach((key) => {
          delete copyState[key];
        });
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error(`type in array 'actions' is not found`);
    }
    stateClones.push({ ...copyState });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
