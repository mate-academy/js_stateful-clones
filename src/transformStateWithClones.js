'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateNew = { ...state };
  const historiState = [];

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        stateNew = {};
        break;

      case 'addProperties':
        stateNew = { ...stateNew, ...act.extraData };
        break;
      case 'removeProperties':
        for (const delKey of act.keysToRemove) {
          delete stateNew[delKey];
        }
        break;
    }
    historiState.push({ ...stateNew });
  }

  return historiState;
}

module.exports = transformStateWithClones;
