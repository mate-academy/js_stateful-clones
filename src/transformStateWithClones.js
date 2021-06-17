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

    if (val.type === 'clear') {
      for (const key in copied) {
        delete copied[key];
      }
    }

    if (val.type === 'addProperties') {
      copied = Object.assign(copied, val.extraData);
    }

    if (val.type === 'removeProperties') {
      val.keysToRemove.forEach(key => {
        delete copied[key];
      });
    };
  });

  return res;
}

module.exports = transformStateWithClones;
