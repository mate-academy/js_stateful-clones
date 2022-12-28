'use strict';

function transformStateWithClones(state, actions) {
  const arrayOfCopies = [];
  let stateCopy = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        action.keysToRemove.forEach(key => delete stateCopy[key]);
        break;
      case 'clear':
        stateCopy = {};
        break;
      default:
        break;
    }
    arrayOfCopies.push({ ...stateCopy });
  }

  return arrayOfCopies;
}

module.exports = transformStateWithClones;
