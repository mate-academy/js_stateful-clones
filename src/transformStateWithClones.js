'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const clone = Object.assign({}, state);

  for (let i = 0; i < actions.length; i++) {
    switch (true) {
      case actions[i].type === 'addProperties':
        for (const key in actions[i].extraData) {
          clone[key] = actions[i].extraData[key];
        }
        res[i] = Object.assign({}, clone);
        break;

      case actions[i].type === 'removeProperties':
        for (const key of actions[i].keysToRemove) {
          delete clone[key];
        }
        res[i] = Object.assign({}, clone);
        break;

      case actions[i].type === 'clear':
        for (const key in state) {
          delete clone[key];
        }
        res[i] = Object.assign({}, clone);
        break;
    }

    return res;
  }
}
module.exports = transformStateWithClones;
