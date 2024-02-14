'use strict';

function addProperties(target, source) {
  return Object.assign(target, source);
}

function removeProperties(obj, properties) {
  properties.forEach(key => {
    delete obj[key];
  });
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
        addProperties(object, action.extraData);
        break;
      case 'removeProperties':
        removeProperties(object, action.keysToRemove);
        break;
      case 'clear':
        object = {};
        break;
      default:
        break;
    }

    history.push({ ...object });
  }

  return history;
}

module.exports = transformStateWithClones;
