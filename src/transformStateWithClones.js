'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copyState = { ...state };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case `addProperties`:
        copyState = Object.assign({}, copyState, action.extraData);
        result.push(copyState);
        break;

      case `removeProperties`:
        copyState = { ...copyState };

        for (const removeItem of action.keysToRemove) {
          delete copyState[removeItem];
        }
        result.push(copyState);
        break;

      case `clear`:
        copyState = {};
        result.push(copyState);
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
