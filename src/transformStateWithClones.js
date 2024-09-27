'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = { ...state };
  const newStatesArr = [];
  const AddProperties = 'addProperties';
  const Clear = 'clear';
  const RemoveProperties = 'removeProperties';

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case AddProperties:
        Object.assign(stateCopy, extraData);
        break;
      case Clear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      case RemoveProperties:
        keysToRemove.forEach(propKey => {
          if (stateCopy.hasOwnProperty(propKey)) {
            delete stateCopy[propKey];
          }
        });
        break;
      default:
        return 'Error';
    }

    newStatesArr.push({ ...stateCopy });
  }

  return newStatesArr;
}

module.exports = transformStateWithClones;
