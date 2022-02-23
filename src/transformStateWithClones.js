'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const objects = [];
  let newObj = { ...state };

  for (const obj of actions) {
    switch (obj.type) {
      case 'addProperties':
        Object.assign(newObj, obj.extraData);
        break;
      case 'removeProperties':
        for (const key of obj.keysToRemove) {
          if (key in newObj) {
            delete newObj[key];
          }
        }
        break;
      case 'clear':
        newObj = {};
        break;
    }
    objects.push({ ...newObj });
  }

  return objects;
}

module.exports = transformStateWithClones;
