'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const massiv = [];
  const copy = { ...state };

  for (const action of actions) {
    transform(copy, action);
  }

  function transform(copy, action) {
    switch (action.type) {
      case 'addProperties':
        const result = Object.assign(copy, action.extraData);

        massiv.push(result);

      case 'removeProperties': {
        for (const key of action.keysToRemove) {
          delete copy[key];
          massiv.push(copy);
        }
      }

      case 'clear': {
        for (const key of Object.keys(state)) {
          delete copy[key];
        }
      }
    }
  }

  return massiv;
}

module.exports = transformStateWithClones;
