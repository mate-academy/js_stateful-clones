'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const stateClone = { ...state };
  const object = [];

  for (let i = 0; i < actions.length; i++) {
    switch (actions[i].type) {
      case 'addProperties':
        object.push(addProperties(stateClone, actions[i].extraData));

        break;
      case 'removeProperties':
        object.push(removeProperties(stateClone, actions[i].keysToRemove));
        // actions[i].keysToRemove.forEach(key => delete stateClone[key]);
        break;
      case 'clear':
        // Object.keys(state).forEach(key => delete state[key]);
        object.push(clearProperties(stateClone));
        break;
    }
  }

  return object;
}

function addProperties(cloneObj, properties) {
  for (const property in properties) {
    cloneObj[property] = properties[property];
  }

  return { ...cloneObj };
}

function removeProperties(cloneObj, properties) {
  for (const index of properties) {
    delete cloneObj[index];
  }

  return { ...cloneObj };
}

function clearProperties(cloneObj) {
  for (const key in cloneObj) {
    delete cloneObj[key];
  }

  return { ...cloneObj };
}

module.exports = transformStateWithClones;
