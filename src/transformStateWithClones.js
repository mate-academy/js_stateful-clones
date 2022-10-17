'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const states = [];
  const mainCopy = Object.assign({}, state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(mainCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(mainCopy, action.keysToRemove);
        break;

      case 'clear':
        removeProperties(mainCopy, Object.keys(mainCopy));
        break;
    }

    addCopyToArray(states, mainCopy);
  }

  return states;
}

/**
 * @param {Object} source
 * @param {String[]} properties
 */
function removeProperties(source, properties) {
  for (const property of properties) {
    delete source[property];
  }
}

/**
 * @param {Object[]} destination
 * @param {Object} object
 */
function addCopyToArray(destination, object) {
  destination.push(Object.assign({}, object));
}

module.exports = transformStateWithClones;
