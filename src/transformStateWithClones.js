'use strict';

function transformStateWithClones(state, actions) {
  const arr = [];
  let obj = Object.assign({}, state);

  for (const item of actions) {
    if (item.type === 'addProperties') {
      const data = item.extraData;

      obj = Object.assign({}, obj, data);
      arr.push({ ...obj });
    } else if (item.type === 'removeProperties') {
      for (const key of item.keysToRemove) {
        delete obj[key];
      }
      arr.push({ ...obj });
    } else if (item.type === 'clear') {
      obj = Object.assign({});
      arr.push({ ...obj });
    }
  }

  return arr;
}

module.exports = transformStateWithClones;
