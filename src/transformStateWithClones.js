'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const ob = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(ob, actions[i].extraData);
        break;

      case 'removeProperties':
        for (let j = 0; j < actions[i].keysToRemove.length; j++) {
          for (const key in ob) {
            if (key === actions[i].keysToRemove[j]) {
              delete ob[key];
            }
          }
        }
        break;

      case 'clear':
        for (const key in ob) {
          delete ob[key];
        }
        break;

      default:
    }

    res.push(Object.assign({}, ob));
  }

  return res;
}

module.exports = transformStateWithClones;
