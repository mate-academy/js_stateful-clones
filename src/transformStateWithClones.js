'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = Object.assign({}, state);
  const res = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties': {
        copyState = {
          ...copyState,
          ...action.extraData,
        };
        break;
      }

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete copyState[key];
        }
        break;

      case 'clear':
        for (const key in copyState) {
          delete copyState[key];
        }
        break;
    }

    res.push({ ...copyState });
  }

  return res;
}

module.exports = transformStateWithClones;
