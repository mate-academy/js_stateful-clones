'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const result = [];

  for (const command of actions) {
    switch (command.type) {
      case 'addProperties':
        Object.assign(stateCopy, command.extraData);
        break;
      case 'removeProperties':
        const propToRemove = command.keysToRemove;

        for (const prop in propToRemove) {
          delete stateCopy[propToRemove[prop]];
        }
        break;
      case 'clear':
        Object.keys(stateCopy).forEach(key => delete stateCopy[key]);
        break;
      default:
        return 'Something went wrong';
    }

    result.push({ ...stateCopy });
  }

  return result;
}

module.exports = transformStateWithClones;
