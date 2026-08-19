'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopyes = [];

  for (const action of actions) {
    const stateCopy = stateCopyes.length
      ? { ...stateCopyes[stateCopyes.length - 1] }
      : { ...state };

    switch (action.type) {
      case 'addProperties':
        for (const propertyName in action.extraData) {
          stateCopy[propertyName] = action.extraData[propertyName];
        }
        break;
      case 'removeProperties':
        for (const propertyName of action.keysToRemove) {
          delete stateCopy[propertyName];
        }
        break;
      case 'clear':
        for (const propertyName in stateCopy) {
          delete stateCopy[propertyName];
        }
        break;
    }

    stateCopyes.push(stateCopy);
  }

  return stateCopyes;
}

module.exports = transformStateWithClones;
