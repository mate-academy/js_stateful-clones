'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ADD = 'addProperties';
  const REMOVE = 'removeProperties';
  const CLEAR = 'clear';
  
  let stateCopy = { ...state };
  const previuosVersions = [];

  for (const action of actions) {
    switch (action.type) {
      case ADD:
        Object.assign(stateCopy, action.extraData);
        break;

      case REMOVE:
        for (const key in action.keysToRemove) {
          delete stateCopy[action.keysToRemove[key]];
        }
        break;

      case CLEAR:
        stateCopy = {};
        break;

      default:
        throw new Error('Wrong type');
    }

    previuosVersions.push({ ...stateCopy });
  }

  return previuosVersions;
}

module.exports = transformStateWithClones;
