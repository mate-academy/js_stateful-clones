'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const actionsType = {
    add: 'addProperties',
    remove: 'removeProperties',
    clear: 'clear',
  };

  const stateCopy = { ...state };
  const stateCopyArray = [];

  for (const action of actions) {
    switch (action.type) {
      case actionsType.add:
        Object.assign(stateCopy, action.extraData);
        break;

      case actionsType.remove:
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;

      case actionsType.clear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
    }
    stateCopyArray.push({ ...stateCopy });
  }

  return stateCopyArray;
}

module.exports = transformStateWithClones;
