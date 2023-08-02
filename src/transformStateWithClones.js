'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  const copyState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copyState, action.extraData);
        break;

      case 'clear':
        for (const key of Object.keys(copyState)) {
          delete copyState[key];
        }
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      default:
        throw new Error('Something went wrong!');
    }

    stateVersions.push({ ...copyState });
  };

  return stateVersions;
}

module.exports = transformStateWithClones;
