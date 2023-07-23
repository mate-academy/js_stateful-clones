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

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'addProperties':
        Object.assign(stateCopy, extraData);
        break;
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;
      case 'removeProperties':
        keysToRemove.forEach(propKey => {
          if (stateCopy.hasOwnProperty(propKey)) {
            delete stateCopy[propKey];
          }
        });
        break;
      default:
        throw new Error('Sorry, none of the cases worked out');
    }

    newStatesArr.push({ ...stateCopy });
  }

  return newStatesArr;
}

module.exports = transformStateWithClones;
