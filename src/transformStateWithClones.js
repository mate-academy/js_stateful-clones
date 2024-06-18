'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  actions.forEach((action) => {
    switch (action.type) {
      case 'addProperties':
        stateCopy = { ...stateCopy, ...action.extraData };
        break;

      case 'clear':
        stateCopy = {};
        break;

      case 'removeProperties':
        stateCopy = { ...stateCopy };

        action.keysToRemove.forEach((key) => {
          delete stateCopy[key];
        });
        break;
    }
    result.push(stateCopy);
  });

  return result;
}

module.exports = transformStateWithClones;
