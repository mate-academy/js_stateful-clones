'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrResult = [];
  const STATE_PREVIOS = { ...state };

  for (const OBJ_ACTION of actions) {
    if (OBJ_ACTION.type === 'addProperties') {
      Object.assign(STATE_PREVIOS, OBJ_ACTION.extraData);
      arrResult.push({ ...STATE_PREVIOS });
    }

    if (OBJ_ACTION.type === 'removeProperties') {
      for (const key of OBJ_ACTION.keysToRemove) {
        delete STATE_PREVIOS[key];
      }
      arrResult.push({ ...STATE_PREVIOS });
    }

    if (OBJ_ACTION.type === 'clear') {
      for (const key in STATE_PREVIOS) {
        delete STATE_PREVIOS[key];
      }
      arrResult.push({ ...STATE_PREVIOS });
    }
  }

  return arrResult;
}

module.exports = transformStateWithClones;
