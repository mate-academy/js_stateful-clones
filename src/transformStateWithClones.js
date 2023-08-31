'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let curentState = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;
    let newState = { ...curentState };

    if (type === 'addProperties') {
      newState = {
        ...newState, ...extraData,
      };
    } else if (type === 'removeProperties') {
      for (const key of keysToRemove) {
        delete newState[key];
      }
    } else if (type === 'clear') {
      newState = {};
    }

    result.push(newState);
    curentState = newState;
  }

  return result;
}

module.exports = transformStateWithClones;
