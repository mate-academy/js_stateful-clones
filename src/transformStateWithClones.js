'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const stateCopy = structuredClone(state);

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        addProperties(stateCopy, action.extraData);
        break;

      case 'removeProperties':
        removeProperties(stateCopy, action.keysToRemove);
        break;

      case 'clear':
        clear(stateCopy);
        break;
    }
    history.push(structuredClone(stateCopy));
  }

  return history;
}

function addProperties(target, source) {
  Object.assign(target, source);
}

function removeProperties(target, source) {
  for (const key of source) {
    delete target[key];
  }
}

function clear(target) {
  for (const key in target) {
    delete target[key];
  }
}

module.exports = transformStateWithClones;
