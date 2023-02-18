'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const result = [];

  actions.forEach(action => {
    switch (action.type) {
      case ('addProperties') :
        Object.assign(copy, action.extraData);
        break;

      case ('removeProperties') :
        for (const key of action.keysToRemove) {
          delete copy[key];
        }
        break;

      case ('clear') :
        copy = {};
        break;

      default:
        throw Error('Unexpected action');
    }

    result.push({ ...copy });
  });

  return result;
}

module.exports = transformStateWithClones;
