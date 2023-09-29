'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arrayResult = [];
  let stateCopy = {
    ...state,
  };

  for (const actionsObject of actions) {
    switch (actionsObject.type) {
      case 'addProperties' :
        Object.assign(stateCopy, actionsObject.extraData);
        break;

      case 'removeProperties' :
        for (const removedElements of actionsObject.keysToRemove) {
          delete stateCopy[removedElements];
        }
        break;

      case 'clear' :
        stateCopy = {};
        break;
    }

    arrayResult.push({ ...stateCopy });
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
