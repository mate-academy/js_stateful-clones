'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const res = [];

  for (const action of actions) {
    switch (true) {
      case action.type === 'addProperties':
        Object.assign(copy, action.extraData);
        res.push({ ...copy });
        break;

      case action.type === 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          if (copy.hasOwnProperty(keyToRemove)) {
            delete copy[keyToRemove];
          }
        }

        res.push({ ...copy });
        break;

      case action.type === 'clear':
        Object.keys(copy).forEach(key => delete copy[key]);
        res.push({ ...copy });
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
