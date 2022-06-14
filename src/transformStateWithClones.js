'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const arr = [];
  let clonedObj = Object.assign({}, state);
  for (const elem of transforms) {
    const { operation, properties } = elem;
    if (operation === 'addProperties') {
      clonedObj = addPropertiesToObject(clonedObj, properties);
    }
    if (operation === 'removeProperties') {
      clonedObj = removePropertiesFromObject(clonedObj, properties);
    }
    if (operation === 'clear') {
      clonedObj = clearObject(clonedObj);
    }
    arr.push(Object.assign({}, clonedObj));
  }
  return arr;
}

function addPropertiesToObject(object, properties) {
  for (const key in properties) {
    if (properties.hasOwnProperty(key)) {
      object[key] = properties[key];
    }
  }
  return object;
}

function removePropertiesFromObject(object, properties) {
  for (const elem of properties) {
    delete object[elem];
  }
  return object;
}

function clearObject(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      delete object[key];
    }
  }
  return object;
}

module.exports = transformStateWithClones;
