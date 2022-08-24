'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const res = [];
  const clone = { ...state };

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        Object.assign(clone, actions[i].extraData);

        break;

      case 'removeProperties':
        actions[i].keysToRemove.forEach((x) => {
          delete clone[`${x}`];
        });
        break;

      case 'clear':
        for (const key in clone) {
          delete clone[key];
        }
        break;
    }

    res.push({ ...clone });
  }

  return res;
}

module.exports = transformStateWithClones;
