'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  const copy = { ...state };

  for (const action of actions) {
    transform(copy, action);
  }

  function transform(result, action) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(result, action.extraData);

        array.push({ ...result });
        break;

      case 'removeProperties': {
        for (const word of action.keysToRemove) {
          delete result[word];
        }

        array.push({ ...result });
        break;
      }

      case 'clear': {
        for (const key of Object.keys(result)) {
          delete result[key];
        }

        array.push({ ...result });
      }
    }
  }

  return array;
}

module.exports = transformStateWithClones;
