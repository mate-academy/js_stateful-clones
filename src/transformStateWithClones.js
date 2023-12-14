'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const allVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete cloneState[key];
        });
        break;

      default:
        cloneState = {};
    }

    allVersions.push({ ...cloneState });
  }

  return allVersions;
}

module.exports = transformStateWithClones;
