'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let resultObject = { ...state };
  const resultArray = [];

  for (const { operation, properties } of transforms) {
    switch (operation) {
      case 'addProperties':
        resultObject = Object.assign(resultObject, properties);
        break;
      case 'removeProperties':
        for (const property of properties) {
          delete resultObject[property];
        };
        break;
      case 'clear':
        for (const property in resultObject) {
          delete resultObject[property];
        };
        break;
    }

    const tempObject = { ...resultObject };

    resultArray.push(tempObject);
  }

  return resultArray;
}

module.exports = transformStateWithClones;
