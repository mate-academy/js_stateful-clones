'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, transforms) {
  const object = Object.assign({}, state);
  const arr = [];
  function addProperties(copy, additionalProps) {
    for (const key in additionalProps) {
      copy[key] = additionalProps[key];
    }
    arr.push(Object.assign({}, copy));
  }
  function removeProperties(copy, additionalProps) {
    additionalProps.forEach(function(key) {
      delete copy[key];
    });
    arr.push(Object.assign({}, copy));
  }
  function clearProperties(copy) {
    for (const key in object) {
      delete copy[key];
    }
    arr.push(Object.assign({}, copy));
  }
  transforms.forEach(function(item) {
    const { operation, properties } = item;
    switch (operation) {
      case 'addProperties':
        addProperties(object, properties);
        break;
      case 'removeProperties':
        removeProperties(object, properties);
        break;
      case 'clear':
        clearProperties(object);
        break;
    }
  });
  return arr;
}

module.exports = transformStateWithClones;
