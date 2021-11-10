'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newState = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case `addProperties`:
        Object.assign(newState, action.extraData);
        break;

      case `removeProperties`:
        for (const key of action.keysToRemove) {
          if (key in newState) {
            delete newState[key];
          }
        }
        break;

      case `clear`:
        newState = {};
    }

    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
