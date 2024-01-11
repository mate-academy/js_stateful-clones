'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 * @returns {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateClones = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        const objectWithoutRemovedProperties = {};

        for (const key in stateCopy) {
          if (!action.keysToRemove.includes(key)) {
            objectWithoutRemovedProperties[key] = stateCopy[key];
          }
        }
        stateCopy = objectWithoutRemovedProperties;
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }
    stateClones.push({ ...stateCopy });
  }

  return stateClones;
}

module.exports = transformStateWithClones;
