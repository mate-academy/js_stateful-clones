'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateVersions = [];
  let cloneObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        cloneObj = Object.assign(cloneObj, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneObj[key];
        }
        break;
      case 'clear':
        cloneObj = {};
        break;
    }
    stateVersions.push({ ...cloneObj });
  }

  return stateVersions;
}

module.exports = transformStateWithClones;
