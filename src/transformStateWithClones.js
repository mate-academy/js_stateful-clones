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
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        cloneObj = Object.assign(cloneObj, extraData);
        break;
      case 'removeProperties':
        for (const key of keysToRemove) {
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
