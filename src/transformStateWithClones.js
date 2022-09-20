'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newState = { ...state };

  for (const actionObj of actions) {
    switch (actionObj.type) {
      case ('addProperties'):
        Object.assign(newState, actionObj.extraData);
        break;

      case ('removeProperties'):
        for (const element of actionObj.keysToRemove) {
          delete newState[element];
        }
        break;

      case ('clear'):
        for (const prop in newState) {
          delete newState[prop];
        }
    }
    result.push({ ...newState });
  }

  return result;
}

module.exports = transformStateWithClones;
