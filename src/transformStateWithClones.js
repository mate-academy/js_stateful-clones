'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state = {}, actions) {
  const result = [state];

  for (const obj of actions) {
    if (obj.type === 'addProperties') {
      const curretObject = { ...result[result.length - 1] };
      const value = Object.assign(curretObject, { ...obj.extraData });

      result.push(value);
    }

    if (obj.type === 'clear') {
      result.push({});
    }

    if (obj.type === 'removeProperties') {
      const deleteData = obj.keysToRemove;
      const valueObject = { ...result[result.length - 1] };

      for (const deleteKey of deleteData) {
        delete valueObject[deleteKey];
      }

      result.push(valueObject);
    }
  }

  result.shift();

  return result;
}

module.exports = transformStateWithClones;
