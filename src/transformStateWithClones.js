'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let cloneState = { ...state };
  const transformHistory = [];

  for (const act of actions) {
    switch (act.type) {
      case 'addProperties':
        Object.assign(cloneState, act.extraData);
        break;

      case 'removeProperties':
        for (const keys of act.keysToRemove) {
          delete cloneState[keys];
        }
        break;

      case 'clear':
        cloneState = {};
        break;
    }
    transformHistory.push({ ...cloneState });
  }

  return transformHistory;
}

module.exports = transformStateWithClones;
