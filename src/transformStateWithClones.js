'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateWithClone = [];
  const copyState = { ...state };

  actions.forEach(({ type, extraData, keysToRemove }) => {
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
        for (const key in copyState) {
          delete copyState[key];
        }

        break;

      default:
        break;
    }
    stateWithClone.push({ ...copyState });
  });

  return stateWithClone;
}
module.exports = transformStateWithClones;
