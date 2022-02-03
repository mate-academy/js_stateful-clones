'use strict';

/**
 * @param {Object} clone
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        for (const k in actions[i].extraData) {
          clone[k] = actions[i].extraData[k];
        }
        result.push(Object.assign({}, clone));
        break;
      case 'removeProperties':
        for (const j of actions[i].keysToRemove) {
          delete clone[j];
        }
        result.push(Object.assign({}, clone));
        break;
      case 'clear':
        for (const m in clone) {
          delete clone[m];
        }
        result.push(Object.assign({}, clone));
        break;
    }
  }

  return result;
}
module.exports = transformStateWithClones;
