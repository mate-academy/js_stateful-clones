'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(current, action.extraData);
        res.push({ ...current });
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete current[key];
        }
        res.push({ ...current });
        break;
      case 'clear':
        current = {};
        res.push({ ...current });
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
