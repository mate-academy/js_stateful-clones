'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const newObj = Object.assign({}, state);

  for (const object of actions) {
    switch (object.type) {
      case 'addProperties':
        Object.assign(newObj, object.extraData);
        break;

      case 'removeProperties':
        for (const key of object.keysToRemove) {
          delete newObj[key];
        }

        break;

      case 'clear':
        for (const remove in newObj) {
          if (newObj[remove]) {
            delete newObj[remove];
          }
        }
        break;
    }
    result.push({ ...newObj });
  }

  return result;
}

module.exports = transformStateWithClones;
