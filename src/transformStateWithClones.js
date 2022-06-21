'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = { ...state };
  const cloneStatus = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete clone[key];
        }

        break;

      case 'clear':
        for (const prop in clone) {
          delete clone[prop];
        }

        break;
    }
    cloneStatus.push(Object.assign({ ...clone }, action.extraData));
  }

  return cloneStatus;
}

module.exports = transformStateWithClones;
