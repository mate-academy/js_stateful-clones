'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let currentObject = { ...state };

  for (const { type, ...data } of actions) {
    switch (type) {
      case 'addProperties':
        {
          const extraObj = Object.values(data)[0];

          currentObject = { ...currentObject };
          result.push(Object.assign(currentObject, extraObj));
        }
        break;
      case 'removeProperties':
        {
          const listToRemove = Object.values(data)[0];

          currentObject = { ...currentObject };

          for (const key of listToRemove) {
            delete currentObject[key];
          }
          result.push(currentObject);
        }
        break;
      case 'clear':
        currentObject = {};
        result.push(currentObject);
    }
  }

  return result;
}

module.exports = transformStateWithClones;
