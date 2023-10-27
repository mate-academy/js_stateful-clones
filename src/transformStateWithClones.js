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
        Object.assign(copy, action.extraData);

        array.push({ ...copy });
        break;

      case 'removeProperties': {
        for (const word of action.keysToRemove) {
          delete copy[word];
        }

        array.push({ ...copy });
        break;
      }

      case 'clear': {
        for (const key of Object.keys(copy)) {
          delete copy[key];
        }

        array.push({ ...copy });
      }
    }
  }

  return array;
}

module.exports = transformStateWithClones;
