'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let clone = { ...state };
  const arr = [];

  for (const item of actions) {
    clone = { ...clone };
    arr.push(clone);

    switch (actions.type) {
      case 'addProperties':
        clone = (Object.assign(clone, item.extraData));
        break;

      case 'removeProperties':
        for (const toDel of item.keysToRemove) {
          delete clone[toDel];
        }
        break;

      case 'clear':
        for (const clear in clone) {
          if (clone.hasOwnProperty(clear)) {
            delete clone[clear];
          }
        }
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
