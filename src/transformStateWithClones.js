'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let nextState = { ...state };
  const stateVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        nextState = {
          ...nextState,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => delete nextState[key]);
        break;

      case 'clear':
        nextState = {};
        break;

      default:
        // console.error('Unexpected action type!');
        break;
    }

    stateVersions.push({ ...nextState });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
