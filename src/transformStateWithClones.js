'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let newObj = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        newObj = addProperties(newObj, action.extraData);
        break;
      case 'removeProperties':
        newObj = removeProperties(newObj, action.keysToRemove);
        break;
      case 'clear':
        newObj = clear(newObj);
        break;
    }
    result.push({ ...newObj });
  }

  return result;
}

const addProperties = (state, extraData) => {
  return Object.assign({}, state, extraData);
};

const removeProperties = (state, keysToRemove) => {
  const newObj = Object.assign({}, state);

  for (const keyToRemove of keysToRemove) {
    delete newObj[keyToRemove];
  }

  return newObj;
};

const clear = (state) => {
  return {};
};

module.exports = transformStateWithClones;
