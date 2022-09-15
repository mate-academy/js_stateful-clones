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

    switch (true) {
      case actions[i].type === 'addProperties':
        actionsType = actions[i].extraData;

        result.push(Object.assign(stateCopy, actionsType));
        break;

      case actions[i].type === 'removeProperties':
        actionsType = actions[i].keysToRemove;

        for (const key of actionsType) {
          delete stateCopy[key];
        }

        result.push(stateCopy);
        break;

      case actions[i].type === 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }

        result.push(stateCopy);
        break;
    }

    stateCopy = {};
    stateCopy = { ...result[i] };

    // if (actions[i].type === 'addProperties') {
    //   actionsType = actions[i].extraData;

    //   result.push(Object.assign(stateCopy, actionsType));
    // } else if (actions[i].type === 'removeProperties') {
    //   actionsType = actions[i].keysToRemove;

    //   for (const key of actionsType) {
    //     delete stateCopy[key];
    //   }

    //   result.push(stateCopy);
    // } else if (actions[i].type === 'clear') {
    //   for (const key in stateCopy) {
    //     delete stateCopy[key];
    //   }

    //   result.push(stateCopy);
    // }
    // stateCopy = {};
    // stateCopy = { ...result[i] };
  }

  return result;
}

module.exports = transformStateWithClones;
