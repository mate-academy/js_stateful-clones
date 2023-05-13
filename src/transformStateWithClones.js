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

    if (point.type === 'addProperties') {
      const resultAction = {
        ...clonedState, ...point.extraData,
      };

      result.push(resultAction);
      clonedState = resultAction;
    }

    if (point.type === 'removeProperties') {
      const resultAction = { ...clonedState };

      for (let i = 0; i < point.keysToRemove.length; i++) {
        delete resultAction[point.keysToRemove[i]];
      }
      result.push(resultAction);
      clonedState = resultAction;
    }

    if (point.type === 'clear') {
      const resultAction = {};

      result.push(resultAction);
      clonedState = resultAction;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
