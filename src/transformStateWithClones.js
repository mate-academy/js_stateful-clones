'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneVersion = [];
  let copyCurrentState = { ...state };

  for (const action of actions) {
    if (action.type === 'clear') {
      copyCurrentState = {};
    }

    if (action.type === 'addProperties') {
      copyCurrentState = { ...copyCurrentState, ...action.extraData };
    }

    if (action.type === 'removeProperties') {
      copyCurrentState = { ...copyCurrentState };

      for (const key of action.keysToRemove) {
        delete copyCurrentState[key];
      }
    }
    cloneVersion.push({ ...copyCurrentState });
  }

  return cloneVersion;
}

module.exports = transformStateWithClones;
