'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateCopy = [];

  for (const action of actions) {
    stateCopy.length === 0
      ? stateCopy.push({ ...state })
      : stateCopy.push({ ...stateCopy[stateCopy.length - 1] });

    const operativeObject = stateCopy[stateCopy.length - 1];

    switch (action.type) {
      case 'addProperties':
        Object.assign(operativeObject, action.extraData);
        break;

      case 'clear':
        Object.keys(operativeObject).forEach(key => {
          delete operativeObject[key];
        });
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete operativeObject[key];
        });
        break;

      default:
        throw new Error('Error occured');
    }
  }

  return stateCopy;
}

module.exports = transformStateWithClones;
