'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const total = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(total, action.extraData);
        break;
    }

    switch (action.type) {
      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete total[key];
        }
        break;
    }

    switch (action.type) {
      case 'clear': {
        for (const key in total) {
          delete total[key];
        }
        break;
      }
    }
    result.push({ ...total });
  }

  return result;
}

module.exports = transformStateWithClones;
