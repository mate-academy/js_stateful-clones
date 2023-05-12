'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = actions;
  let clonedState = { ...state };

  for (const action in actions) {
    const point = actions[action];

    if (point.type === 'addProperties') {
      result[action] = {
        ...clonedState, ...point.extraData,
      };
      clonedState = result[action];
    }

    if (point.type === 'removeProperties') {
      result[action] = { ...clonedState };

      for (let i = 0; i < point.keysToRemove.length; i++) {
        delete result[action][point.keysToRemove[i]];
      }
      clonedState = result[action];
    }

    if (point.type === 'clear') {
      result[action] = {};
      clonedState = result[action];
    }
  }

  return result;
}

module.exports = transformStateWithClones;
