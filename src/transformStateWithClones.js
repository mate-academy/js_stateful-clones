'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let clonedState = { ...state };

  for (const action in actions) {
    const point = actions[action];

    switch (point.type) {
      case 'addProperties':
        clonedState = {
          ...clonedState, ...point.extraData,
        };
        break;

      case 'removeProperties':
        clonedState = { ...clonedState };

        for (let i = 0; i < point.keysToRemove.length; i++) {
          delete clonedState[point.keysToRemove[i]];
        };
        break;

      case 'clear':
        clonedState = {};
        break;

      default:
        break;
    }

    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
