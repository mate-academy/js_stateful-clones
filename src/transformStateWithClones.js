'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const primaryState = { ...state };

  for (const act of actions) {
    switch (act.type) {
      case 'clear':
        for (const keys in primaryState) {
          delete primaryState[keys];
        };
        break;
      case 'addProperties':
        Object.assign(primaryState, act.extraData);
        break;
      case 'removeProperties':
        for (const key of act.keysToRemove) {
          delete primaryState[key];
        }
        break;
    }
    states.push({ ...primaryState });
  }

  return states;
}

module.exports = transformStateWithClones;
