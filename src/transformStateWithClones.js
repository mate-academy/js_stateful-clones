'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let addProperties = {};
  let removeProperties = {};
  let cleanProperties = {};
  let addObject = state;

  const array = [];

  for (const action of actions) {
    if (action.type === 'addProperties') {
      addProperties = { ...addObject, ...action.extraData };
      array.push(addProperties);
      addObject = addProperties;
      continue;
    }

    if (action.type === 'removeProperties') {
      removeProperties = { ...addObject };

      for (const i of action.keysToRemove) {
        delete removeProperties[i];
      }
      array.push(removeProperties);
      addObject = removeProperties;
      continue;
    }

    if (action.type === 'clear') {
      cleanProperties = { ...state };

      for (const keys in cleanProperties) {
        delete cleanProperties[keys];
      }
      array.push(cleanProperties);
      addObject = cleanProperties;
      continue;
    }
  }

  return array;
}

module.exports = transformStateWithClones;
