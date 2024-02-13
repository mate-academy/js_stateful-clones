'use strict';

function addProperties(target, source) {
  return Object.assign(target, source);
}

function removeProperties(obj, properties) {
  return Object.keys(obj)
    .reduce((result, key) => {
      if (!properties.includes(key)) {
        result[key] = obj[key];
      }

      return result;
    }, {});
}

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let object = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        object = addProperties(object, action.extraData);
        break;
      case 'removeProperties':
        object = removeProperties(object, action.keysToRemove);
        break;
      case 'clear':
        object = {};
        break;
    }
    history.push({ ...object });
  }

  return history;
}

module.exports = transformStateWithClones;
