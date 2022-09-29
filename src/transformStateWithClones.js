'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const arr = [];
  let clone = { ...state };

  actions.forEach(action => {
    switch (action.type) {
      case ('addProperties'):
        clone = Object.assign(clone, action.extraData);
        break;

      case ('removeProperties'):
        action.keysToRemove.forEach((key) => delete clone[key]);
        break;

      case ('clear'):
        clone = {};
        break;

      default:
        return 'Action undefined';
    }

    arr.push({ ...clone });
  });

  return arr;
}

module.exports = transformStateWithClones;
