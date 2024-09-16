'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [Object.assign({}, state)];
  let cloneObject = result[0];

  const actionType = {
    addProperties: (action) => {
      cloneObject = Object.assign({}, cloneObject, action.extraData);
    },
    removeProperties: (action) => {
      cloneObject = Object.assign({}, cloneObject);

      for (const key of action.keysToRemove) {
        delete cloneObject[key];
      }
    },
    clear: () => {
      cloneObject = {};
    },
  };

  for (const action of actions) {
    if (action.type in actionType) {
      actionType[action.type](action);
    }
    result.push(cloneObject);
  }

  return result.slice(1);
}

module.exports = transformStateWithClones;
