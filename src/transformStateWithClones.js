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

      case 'clear':
        for (const item in cloneState) {
          delete cloneState[item];
        }
        break;

      default:
        throw new Error('unknown type');
    }
    actionsInfo.push({ ...cloneState });
  }

  return actionsInfo;
}

module.exports = transformStateWithClones;
