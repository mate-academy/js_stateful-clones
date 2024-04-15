'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData } = action;

    if (type === 'addProperties') {
      newState = { ...newState, ...extraData };
    }

    if (type === 'removeProperties') {
      for (const remove of action.keysToRemove) {
        delete newState[remove];
      }
    }

    if (type === 'clear') {
      newState = {};
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
