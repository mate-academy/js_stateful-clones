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

  const adding = 'AddProperties';
  const removing = 'RemoveProperties';
  const deleting = 'clear';

  for (const actionsObject of actions) {
    switch (actionsObject.type) {
      case adding :
        Object.assign(stateCopy, ...actionsObject.extraData);
        break;

      case removing :
        for (const keys of actionsObject.keysToRemove) {
          delete stateCopy[keys];
        }
        break;

      case deleting :
        stateCopy = {};
    }

    arrayResult.push(stateCopy);
  }

  return arrayResult;
}

module.exports = transformStateWithClones;
