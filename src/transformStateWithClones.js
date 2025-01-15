'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  let stateCopy = { ...state };

  function removeProp(obj, properties) {
    for (const property of properties) {
      delete obj[property];
    }
  }

  function clear(obj) {
    for (const key of Object.keys(obj)) {
      delete obj[key];
    }
  }

  function addProp(obj, properties) {
    Object.assign(obj, properties);
  }

  for (const action of actions) {
    const newObj = { ...stateCopy };

    switch (action.type) {
      case 'addProperties':
        addProp(newObj, action.extraData);
        break;

      case 'removeProperties':
        removeProp(newObj, action.keysToRemove);
        break;

      case 'clear':
        clear(newObj);
        break;

      default:
        return 'invalid data';
    }

    result.push(newObj);
    stateCopy = newObj;
  }

  return result;
}

module.exports = transformStateWithClones;
