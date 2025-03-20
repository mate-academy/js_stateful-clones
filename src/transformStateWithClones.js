'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const transformStateResult = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        const keys = Object.keys(stateClone);

        for (const key of keys) {
          delete stateClone[key];
        }
        transformStateResult.push({ ...stateClone });
        break;

      case 'addProperties':
        Object.assign(stateClone, action.extraData);
        transformStateResult.push({ ...stateClone });
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        transformStateResult.push({ ...stateClone });
        break;
    }
  }

  return transformStateResult;
}

module.exports = transformStateWithClones;
