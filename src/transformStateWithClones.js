'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { keysToRemove, extraData, type } = action;

    switch (true) {
      case type === 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case type === 'removeProperties':
        for (const i of keysToRemove) {
          delete copyState[i];
        };
        break;

      case type === 'clear':
        for (const key in copyState) {
          if (copyState.hasOwnProperty(key)) {
            delete copyState[key];
          }
        }
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
