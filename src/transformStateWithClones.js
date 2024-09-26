'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newState = Object.assign({}, state);
  const clones = [];

  for (const property of actions) {
    switch (property.type) {
      case 'addProperties':
        Object.assign(newState, property.extraData);
        break;

      case 'removeProperties':
        property.keysToRemove
          .forEach(key => delete newState[key]);
        break;

      case 'clear':
        Object.keys(newState)
          .forEach(key => delete newState[key]);
        break;

      default:
        return `Please provide valid data`;
    }
    clones.push({ ...newState });
  }

  return clones;
}

module.exports = transformStateWithClones;
