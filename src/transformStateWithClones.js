'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const stateCopy = {};

  Object.assign(stateCopy, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        for (const j of action.keysToRemove) {
          delete stateCopy[j];
        }
        break;

      case 'clear':
        for (const k in stateCopy) {
          delete stateCopy[k];
        }
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
