'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformedState = Object.assign({}, state);
  const transformedArray = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(transformedState, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete transformedState[key];
        };
        break;

      case 'clear':
        for (const key in transformedState) {
          delete transformedState[key];
        }
        break;
      default: return undefined;
    }

    transformedArray.push({ ...transformedState });
  }

  return transformedArray;
}

module.exports = transformStateWithClones;
