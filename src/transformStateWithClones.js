'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        if (i === 0) {
          result.push(Object.assign({}, state, actions[i].extraData));
          break;
        } else {
          result.push(Object.assign({}, result[i - 1], actions[i].extraData));
        } break;

      case 'removeProperties':
        if (i === 0) {
          const deleteProp = { ...state };

          for (const key of actions[i].keysToRemove) {
            delete deleteProp[key];
          }

          result.push(deleteProp);
          break;
        } else {
          const deleteProp = { ...result[i - 1] };

          for (const key of actions[i].keysToRemove) {
            delete deleteProp[key];
          }

          result.push(deleteProp);
          break;
        }

      case 'clear':
        result.push({});
        break;
    }
  }

  return result;
}

module.exports = transformStateWithClones;
