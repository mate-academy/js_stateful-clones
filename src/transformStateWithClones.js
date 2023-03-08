'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const transformState = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(newState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          if (newState[key] !== undefined) {
            delete newState[key];
          }
        }
        break;

      case 'clear':
        newState = {};
    }
    transformState.push({ ...newState });
  }

  return transformState;
}

module.exports = transformStateWithClones;
