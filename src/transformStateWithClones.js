'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const states = [];

  for (const i of actions) {
    switch (i.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...i.extraData };
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };

        for (const key of i.keysToRemove) {
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
