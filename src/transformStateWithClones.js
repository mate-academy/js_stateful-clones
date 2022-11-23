'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const resultState = [];
  const stateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);

        break;

      case 'removeProperties': {
        action.keysToRemove.forEach((key) => delete stateCopy[key]);

        break;
      }

      case 'clear': {
        for (const key in stateCopy) {
          delete stateCopy[key];
        };
        break;
      }
    }
    resultState.push({ ...stateCopy });
  });

  return resultState;
}

module.exports = transformStateWithClones;
