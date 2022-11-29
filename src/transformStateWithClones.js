'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(originState, actions) {
  const state = Object.assign({}, originState);
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(state, action.extraData);
        break;

      case 'removeProperties':
        for (const keysToRemove of action.keysToRemove) {
          delete state[keysToRemove];
        };
        break;

      case 'clear':
        for (const key in state) {
          delete state[key];
        }
        break;

      default:
        break;
    }
    stateVersions.push({ ...state });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
