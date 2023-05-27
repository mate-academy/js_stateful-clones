'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const CopyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(CopyState, action.extraData);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          if (CopyState[key]) {
            delete CopyState[key];
          }
        }
        break;

      case 'clear':
        for (const key in CopyState) {
          delete CopyState[key];
        }
        break;
    }
    result.push({ ...CopyState });
  }

  return result;
}

module.exports = transformStateWithClones;
