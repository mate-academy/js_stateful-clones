'use strict';

/**
 * @param {Object} clone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = {};

  for (const k in state) {
    clone[k] = state[k];
  }

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      for (const key in actions[i].extraData) {
        clone[key] = actions[i].extraData[key];
      }
      result.push(Object.assign({}, clone));
    } else if (actions[i].type === 'removeProperties') {
      for (const j of actions[i].keysToRemove) {
        delete clone[j];
      }
      result.push(Object.assign({}, clone));
    } else if (actions[i].type === 'clear') {
      for (const stateKey in clone) {
        delete clone[stateKey];
      }
      result.push(Object.assign({}, clone));
    }
  }

  return result;
}
module.exports = transformStateWithClones;
