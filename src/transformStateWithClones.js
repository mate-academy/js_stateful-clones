'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const array = [];
  let newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(newObj, action.extraData);
        break;

      case 'removeProperties':
        for (const type of action.keysToRemove) {
          if (newObj[type]) {
            delete newObj[type];
          }
        }
        break;

      case 'clear':
        newObj = {};
        break;

      default:
        action.type = 'This action type is not supported';
        break;
    }

    array.push({ ...newObj });
  }

  return array;
}

module.exports = transformStateWithClones;
