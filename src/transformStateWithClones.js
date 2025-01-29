'use strict';

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const history = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;
      case 'removeProperties':
        stateCopy = { ...stateCopy };

        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;
      case 'clear':
        stateCopy = {};
        break;

      default:
        return 'error';
    }

    history.push(stateCopy);
  });

  return history;
}

module.exports = transformStateWithClones;
