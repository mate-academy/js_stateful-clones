'use strict';

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const history = [];

  for (const action of actions) {
    switch (action.type) {
      case 'clear':
        stateCopy = {};
        break;
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete stateCopy[key];
        }
        break;
      default:
        throw new Error(`Unsupported action type: ${action.type}`);
    }

    history.push({ ...stateCopy });
  }

  return history;
}

module.exports = transformStateWithClones;
