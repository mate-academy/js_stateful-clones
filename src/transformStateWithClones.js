'use strict';

const ADD_PROPERTIES = 'addProperties';
const REMOVE_PROPERTIES = 'removeProperties';
const CLEAR = 'clear';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClone = { ...state };
  const stateLog = [];

  for (const act of actions) {
    switch (act.type) {
      case ADD_PROPERTIES:
        Object.assign(stateClone, act.extraData);
        break;
      case REMOVE_PROPERTIES:
        act.keysToRemove.forEach((element) => {
          delete stateClone[element];
        });
        break;
      case CLEAR:
        for (const key in stateClone) {
          delete stateClone[key];
        }
        break;
      default:
        throw new Error('Wrong type');
    }
    stateLog.push({ ...stateClone });
  }

  return stateLog;
}

module.exports = transformStateWithClones;
