'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const nextState = { ...state };
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    const { type, extraData, keysToRemove } = actions[i];

    switch (type) {
      case 'addProperties':
        Object.assign(nextState, extraData);
        break;

      case 'removeProperties':
        for (const key in keysToRemove) {
          delete nextState[keysToRemove[key]];
        }
        break;

      case 'clear':
        for (const clear in nextState) {
          delete nextState[clear];
        }
        break;

      default:
        return;
    }

    result.push({ ...nextState });
  }

  return result;
}

module.exports = transformStateWithClones;
