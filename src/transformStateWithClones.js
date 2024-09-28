'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const temporalState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(temporalState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete temporalState[key];
        };
        break;

      case 'clear':
        for (const key in temporalState) {
          delete temporalState[key];
        };
        break;
    }
    stateVersions.push({ ...temporalState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
