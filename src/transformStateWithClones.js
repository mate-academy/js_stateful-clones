'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let stateCopy = { ...state };

  return actions.map((action) => {
    switch (action.type) {
      case 'addProperties':
        return {
          ...Object.assign(stateCopy, action.extraData),
        };
      case 'removeProperties':
        action.keysToRemove.forEach((key) => delete stateCopy[key]);

        return { ...stateCopy };
      case 'clear':
        stateCopy = {};

        return {};
      default:
        throw new Error('Whoops, something bad happened');
    }
  });
}

module.exports = transformStateWithClones;
