'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };

  const stateArr = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const prop of action.keysToRemove) {
          delete clone[prop];
        }
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    stateArr.push({ ...clone });
  }

  return stateArr;
}

module.exports = transformStateWithClones;
