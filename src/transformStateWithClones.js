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
        newObj = { ...newObj };
        Object.assign(newObj, obj.extraData);
        objects.push(newObj);
        break;
      case 'removeProperties':
        newObj = { ...newObj };

        for (const key of obj.keysToRemove) {
          if (key in newObj) {
            delete newObj[key];
          }
        }
        objects.push(newObj);
        break;
      case 'clear':
        newObj = { ...newObj };
        Object.keys(newObj).forEach(key => delete newObj[key]);
        objects.push(newObj);
        break;
    }
  }

  return objects;
}

module.exports = transformStateWithClones;
