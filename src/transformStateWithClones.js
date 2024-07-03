'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = {};

  Object.assign(stateCopy, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const keyToRemove of action.keysToRemove) {
          delete stateCopy[keyToRemove];
        }
        break;

      case 'clear':
        stateCopy = {};
        break;

      default:
        break;
    }

    const object = {
      ...stateCopy,
    };

    result.push(object);
  }

  return result;
}

module.exports = transformStateWithClones;
