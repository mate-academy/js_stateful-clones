'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = Object.assign({}, state);
  const out = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        out.push(Object.assign({}, clone));
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        };
        out.push(Object.assign({}, clone));
        break;

      case 'removeProperties':
        const remove = action.keysToRemove;

        for (const i in remove) {
          delete clone[remove[i]];
        }
        out.push(Object.assign({}, clone));
        break;

      default :
        break;
    }
  }

  return out;
}

module.exports = transformStateWithClones;
