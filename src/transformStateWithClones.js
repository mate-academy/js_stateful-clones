'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const obj = {
    ...state,
  };
  const result = [];

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':

        Object.assign(obj, action.extraData);

        result.push({
          ...obj,
        });

        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete obj[key];
        }

        result.push({
          ...obj,
        });

        break;

      case 'clear':
        for (const key in obj) {
          delete obj[key];
        }

        result.push({});
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
