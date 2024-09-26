'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let statedCopy = { ...state };
  const ADDPROP = 'addProperties';
  const REMOVEPROP = 'removeProperties';
  const CLEAR = 'clear';
  const ACTIONSRESULT = [];

  for (const action of actions) {
    switch (action.type) {
      case ADDPROP:
        Object.assign(statedCopy, action.extraData);
        break;

      case REMOVEPROP:
        for (const key of action.keysToRemove) {
          delete statedCopy[key];
        }
        break;

      case CLEAR:
        statedCopy = {};
        break;

      default:
        break;
    }

    ACTIONSRESULT.push({ ...statedCopy });
  }

  return ACTIONSRESULT;
}

module.exports = transformStateWithClones;
