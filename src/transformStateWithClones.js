'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let anotherState = { ...state };
  const massState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(anotherState, extraData);
    }

    if (type === 'removeProperties') {
      for (const del of keysToRemove) {
        delete anotherState[del];
      }
    }

    if (type === 'clear') {
      anotherState = {};
    }

    massState.push({ ...anotherState });
  }

  return massState;
}
module.exports = transformStateWithClones;
