'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = {};
  const versionState = [];

  Object.assign(cloneState, state);

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        for (const element in cloneState) {
          delete cloneState[element];
        }
        break;

      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete cloneState[key];
        }
        break;
    }
    versionState.push({ ...cloneState });
  }

  return versionState;
}

module.exports = transformStateWithClones;
