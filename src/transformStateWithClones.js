'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const obj = { ...state };

  for (let j = 0; j < actions.length; j++) {
    switch (actions[j].type) {
      case 'addProperties': Object.assign(obj, actions[j].extraData);
        break;

      case 'removeProperties':
        for (const key of actions[j].keysToRemove) {
          delete obj[key];
        }
        break;

      case 'clear':
        for (const key1 in obj) {
          delete obj[key1];
        }
    }
    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;
