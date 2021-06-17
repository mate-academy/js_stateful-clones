'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let copied = { ...state };
  const res = [];

  actions.forEach(val => {
    copied = { ...copied };
    res.push(copied);

    switch (val.type) {
      case 'clear':
        for (const key in copied) {
          delete copied[key];
        }; break;
      case 'addProperties':
        copied = Object.assign(copied, val.extraData);
        break;
      case 'removeProperties':
        val.keysToRemove.forEach(key => {
          delete copied[key];
        }); break;
    }
  });

  return res;
}

module.exports = transformStateWithClones;
