'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let arrayResult = [];
  const stateCopy = {
    ...state,
  };

  for (const actionsObject of actions) {
    if (actionsObject.type['AddProperties']) {
      Object.assign(stateCopy, actionsObject.extraData);
    }

    if (actionsObject.type['RemoveProperties']) {
      for (const removedItem of actionsObject.keystoRemove) {
        delete stateCopy[removedItem];
      }
    }

    if (actionsObject.type['clear']) {
      for (const keys of Object.keys(actionsObject)) {
        delete stateCopy[keys];
      }
    }

    arrayResult.push(stateCopy);

    return arrayResult;
  }
}

module.exports = transformStateWithClones;
