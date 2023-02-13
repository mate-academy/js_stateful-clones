'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const preVersions = [];
  let objCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(objCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete objCopy[item];
        }
        break;

      case 'clear':
        objCopy = {};
        break;
    }

    preVersions.push({ ...objCopy });
  }

  return preVersions;
}

module.exports = transformStateWithClones;
