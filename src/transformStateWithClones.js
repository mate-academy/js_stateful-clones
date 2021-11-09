'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let newObj;
  let count = 0;

  for (const obj of actions) {
    for (const key in obj) {
      if (key === 'type' && obj[key] === 'addProperties') {
        if (count === 0) {
          newObj = [{}];
          Object.assign(newObj[0], state);
          Object.assign(newObj[count], obj.extraData);
          count++;
        } else {
          newObj.push({});
          Object.assign(newObj[count], newObj[count - 1]);
          Object.assign(newObj[count], obj.extraData);
          count++;
        }
      }

      if (key === 'type' && obj[key] === 'removeProperties') {
        if (count === 0) {
          newObj = [{}];
          Object.assign(newObj[0], state);
        } else {
          newObj.push({});
          Object.assign(newObj[count], newObj[count - 1]);
        }

        for (const props of obj.keysToRemove) {
          delete newObj[count][props];
        }
        count++;
      }

      if (key === 'type' && obj[key] === 'clear') {
        if (count === 0) {
          newObj = [{}];
          Object.assign(newObj[0], state);
        } else {
          newObj.push({});
          Object.assign(newObj[count], newObj[count - 1]);
        }

        for (const keys in newObj[count]) {
          delete newObj[count][keys];
        }
        count++;
      }
    }
  }

  return newObj;
}

module.exports = transformStateWithClones;
