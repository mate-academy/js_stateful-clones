'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithcopyStates(state, actions) {
  const rezult = [];
  let copyState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        copyState = {};
        break;

      default:
        throw new Error('Unhandled action type');
    }
    rezult.push({ ...copyState });
  }

  return rezult;
}

module.exports = transformStateWithcopyStates;
