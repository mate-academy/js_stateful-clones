'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ResultObject = [];

  for (const operation of actions) {
    const CurrentObject = {};

    if (ResultObject.length !== 0) {
      Object.assign(CurrentObject, ResultObject[ResultObject.length - 1]);
    }

    if (ResultObject.length === 0) {
      Object.assign(CurrentObject, state);
    }

    if (operation.type === 'addProperties') {
      Object.assign(CurrentObject, operation.extraData);
      ResultObject.push(CurrentObject);
    }

    if (operation.type === 'clear') {
      for (const key in CurrentObject) {
        delete CurrentObject[key];
      }
      ResultObject.push(CurrentObject);
    }

    if (operation.type === 'removeProperties') {
      const keysToRemove = operation.keysToRemove;

      for (const key of keysToRemove) {
        delete CurrentObject[key];
      }
      ResultObject.push(CurrentObject);
    }
  }

  return ResultObject;
}

module.exports = transformStateWithClones;
