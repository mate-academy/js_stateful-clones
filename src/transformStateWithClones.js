'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_CLEAR = 'clear';
  const ACTION_ADD_PROPERTIES = 'addProperties';
  const ACTION_REMOVE__PROPERTIES = 'removeProperties';
  const transformStateResult = [];
  const stateClone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case ACTION_CLEAR:
        const keys = Object.keys(stateClone);

        for (const key of keys) {
          delete stateClone[key];
        }
        break;

      case ACTION_ADD_PROPERTIES:
        Object.assign(stateClone, action.extraData);
        break;

      case ACTION_REMOVE__PROPERTIES:
        for (const key of action.keysToRemove) {
          delete stateClone[key];
        }
        break;
    }

    transformStateResult.push({ ...stateClone });
  }

  return transformStateResult;
}

module.exports = transformStateWithClones;
