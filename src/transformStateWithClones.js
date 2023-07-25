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

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      const { extraData } = action;

      clonedState = {
        ...clonedState,
        ...extraData,
      };
    } else if (type === 'removeProperties') {
      const { keysToRemove } = action;

      for (const key of keysToRemove) {
        delete clonedState[key];
      }
    } else if (type === 'clear') {
      clonedState = {};
    }

    result.push({ ...clonedState });
  }

  return result;
}

module.exports = transformStateWithClones;
