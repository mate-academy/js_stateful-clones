'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case `addProperties`:
        Object.assign(copyState, action.extraData);
        break;

      case `removeProperties`:
        for (const removeItem of action.keysToRemove) {
          delete copyState[removeItem];
        }
        break;

      case `clear`:
        Object.keys(copyState).forEach(a => delete copyState[a]);
        break;
    }
    result.push({ ...copyState });
  }

  return result;
}

module.exports = transformStateWithClones;
