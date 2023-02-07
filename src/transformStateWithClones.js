'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const copy = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case ('addProperties'):
        Object.assign(copy, action.extraData);
        break;

      case ('removeProperties'):
        action.keysToRemove.forEach(rem => {
          delete copy[rem];
        });
        break;

      case ('clear'):
        for (const key in copy) {
          delete copy[key];
        }
        break;

      default: return 'Please, enter the valid data';
    }

    result.push({ ...copy });
  });

  return result;
}

module.exports = transformStateWithClones;
