'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const res = [];
  const copy = { ...state };

  for (const object of actions) {
    switch (object.type) {
      case ('addProperties'):
        Object.assign(copy, object.extraData);
        break;

      case ('removeProperties'):
        for (const el of object.keysToRemove) {
          delete copy[el];
        }
        break;

      case ('clear'):
        for (const key in copy) {
          if (copy.hasOwnProperty(key)) {
            delete copy[key];
          }
        }
        break;
    }
    res.push({ ...copy });
  }

  return res;
}

module.exports = transformStateWithClones;
