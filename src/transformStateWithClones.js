'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let  stateCopy = { ...state };
  const states = [];

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;

      case 'removeProperties':
        for (const key of keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }
    states.push({ ...stateCopy });
  }

  return states;
}

module.exports = transformStateWithClones;
