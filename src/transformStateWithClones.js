'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const elements = [];
  let newState = { ...state };

  for (const action of actions) {
    newState = { ...newState };

    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const del of keysToRemove) {
          delete newState[del];
        }
        break;

      case 'clear':
        newState = {};
        break;

      default:
        break;
    }

    elements.push({ ...newState });
  }

  return elements;
}

module.exports = transformStateWithClones;
