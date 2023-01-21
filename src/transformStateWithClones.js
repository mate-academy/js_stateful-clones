'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const preVersions = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const item of action.keysToRemove) {
          delete copy[item];
        }
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        }
        break;
    }

    const clone = { ...copy };

    preVersions.push(clone);
  }

  return preVersions;
}

module.exports = transformStateWithClones;
