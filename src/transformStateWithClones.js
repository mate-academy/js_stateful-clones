'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = { ...state };
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newState, action.extraData);
        res.push({ ...newState });

        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        res.push({ ...newState });
        break;
      case 'clear':
        Object.keys(newState).forEach((key) => delete newState[key]);
        res.push({ ...newState });
        break;
    }
  }

  return res;
}

module.exports = transformStateWithClones;
