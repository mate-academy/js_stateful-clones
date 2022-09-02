'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newAction = [];
  const copyState = { ...state };

  for (const action of actions) {
    const { extraData, keysToRemove, type } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(copyState, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const j in copyState) {
          delete copyState[j];
        }
        break;

      default:
        return [];
    }
    newAction.push({ ...copyState });
  }

  return newAction;
}

module.exports = transformStateWithClones;
