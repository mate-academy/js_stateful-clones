'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newMass = [];
  const copy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete copy[keyRemove];
        };
        break;

      case 'clear':
        for (const key in copy) {
          delete copy[key];
        };
        break;

      default:
        break;
    }

    newMass.push({ ...copy });
  }

  return newMass;
}

module.exports = transformStateWithClones;
