'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(stateCopy, action.extraData);
        break;

      case ('removeProperties'):
        for (const removed of action.keysToRemove) {
          delete stateCopy[removed];
        }
        break;
      case ('clear'):
        Object.keys(stateCopy).forEach(removed => delete stateCopy[removed]);
        break;

      default:
        throw new Error('Action type is invalid');
    }

    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
