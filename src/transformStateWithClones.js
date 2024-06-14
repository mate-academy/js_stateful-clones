'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const massState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      Object.assign(stateCopy, extraData);
    }

    if (type === 'removeProperties') {
      for (const del of keysToRemove) {
        delete stateCopy[del];
      }
    }

    if (type === 'clear') {
      stateCopy = {};
    }

    massState.push({ ...stateCopy });
  }

  return massState;
}
module.exports = transformStateWithClones;
