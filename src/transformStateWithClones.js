'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  for (let i = 0; i < actions.length; i++) {
    let actionsType;

    switch (actions[i].type) {
      case 'addProperties':
        actionsType = actions[i].extraData;

        result.push(Object.assign(stateCopy, actionsType));
        break;

      case 'removeProperties':
        actionsType = actions[i].keysToRemove;

        for (const key of actionsType) {
          delete stateCopy[key];
        }

        result.push(stateCopy);
        break;

      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        result.push(stateCopy);
        break;
    }

    stateCopy = { ...result[i] };
  }

  return result;
}

module.exports = transformStateWithClones;
