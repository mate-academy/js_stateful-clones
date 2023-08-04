'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateVersion = [];
  const cloneState = {...state};

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete cloneState[property];
        }
        break;

      case 'clear':
        for (const property in cloneState) {
          delete cloneState[property];
        }
        break;

      default:
        return new Error('action is error');
    }

    stateVersion.push({...cloneState});
  }

  return stateVersion;
}

module.exports = transformStateWithClones;
