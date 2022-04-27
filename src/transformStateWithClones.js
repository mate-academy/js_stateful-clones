'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  const a = { ...state };

  for (const key of actions) {
    switch (key.type) {
      case 'addProperties' :

        Object.assign(a, key.extraData);
        arr.push({ ...a });

        break;

      case 'removeProperties' :

        for (const j of key.keysToRemove) {
          delete a[j];
        }
        arr.push({ ...a });

        break;

      case 'clear' :
        for (const k in a) {
          delete a[k];
        }
        arr.push({ ...a });

        break;
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
