'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let obj = { ...state };
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        obj = {
          ...obj,
          ...action.extraData,
        };
        break;

      case 'removeProperties':
        for (const property of action.keysToRemove) {
          delete obj[property];
        }
        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }
    }

    res.push({ ...obj });
  }

  return res;
}

module.exports = transformStateWithClones;
