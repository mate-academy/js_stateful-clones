'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let current = { ...state };
  const history = [];

  actions.forEach((action) => {
    switch (action.type) {
      case 'clear':
        current = {};
        break;

      case 'addProperties':
        current = { ...current, ...action.extraData };
        break;

      case 'removeProperties':
        current = { ...current };

        action.keysToRemove.forEach((key) => {
          delete current[key];
        });
        break;

      default:
        break;
    }

    history.push(current);
  });

  return history;
}

module.exports = transformStateWithClones;
