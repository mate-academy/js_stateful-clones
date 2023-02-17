'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const copy = { ...state };
  const result = [];

  actions.forEach(action => {
    switch (action.type) {
      case ('addProperties') :
        Object.assign(copy, action.extraData);
        break;

      case ('removeProperties') :
        Object.keys(action.keysToRemove).forEach(function(key) {
          delete copy[action.keysToRemove[key]];
        });
        break;

      case ('clear') :
        for (const key in copy) {
          delete copy[key];
        }
    }

    result.push({ ...copy });
  });

  return result;
}

module.exports = transformStateWithClones;
