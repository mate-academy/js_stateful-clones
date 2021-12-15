'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformState = { ...state };
  const result = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'removeProperties':
        for (const key of keysToRemove) {
          delete transformState[key];
        }
        break;

      case 'addProperties':
        Object.assign(transformState, extraData);
        break;

      case 'clear':
        for (const item in transformState) {
          delete transformState[item];
        }
        break;
    }
    result.push({ ...transformState });
  }

  return result;
}

module.exports = transformStateWithClones;
