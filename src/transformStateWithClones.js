'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const cloneState = { ...state };
  const actionsInfo = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(cloneState, action.extraData);
        break;

      case 'removeProperties':
        for (const extra of action.keysToRemove) {
          delete cloneState[extra];
        };
        break;

      default:
        for (const item in cloneState) {
          delete cloneState[item];
        }
        break;
    }
    actionsInfo.push({ ...cloneState });
  }

  return actionsInfo;
}

module.exports = transformStateWithClones;
