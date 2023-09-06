'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };
  const arrayOfProperties = [];

  actions.forEach(action => {
    switch (action.type) {
      case 'addProperties':
        Object.assign(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        action.keysToRemove.forEach(key => {
          delete stateCopy[key];
        });
        break;

      case 'clear': {
        stateCopy = {};
      }
    }

    arrayOfProperties.push({ ...stateCopy });
  });

  return arrayOfProperties;
}

module.exports = transformStateWithClones;
