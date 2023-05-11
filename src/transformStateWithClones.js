'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case 'clear':
        newState = {};
        break;

      case 'addProperties':
        newState = {
          ...newState,
          ...extraData,
        };
        break;

      case 'removeProperties':
        for (const keyToRemove of keysToRemove) {
          delete newState[keyToRemove];
        }
        break;
    }

    stateVersions.push({ ...newState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
