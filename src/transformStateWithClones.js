'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const ACTION_TYPES = {
    clear: 'clear',
    addProperties: 'addProperties',
    removeProperties: 'removeProperties',
  };
  const states = [];

  for (let i = 0; i < actions.length; i++) {
    const currentAction = actions[i];
    const currentState = states[i - 1] ?? state;

    switch (currentAction.type) {
      case ACTION_TYPES.clear:
        states.push({});
        break;
      case ACTION_TYPES.removeProperties:
        states.push(removeProperties(currentState, currentAction.keysToRemove));
        break;
      case ACTION_TYPES.addProperties:
        states.push(addProperties(currentState, currentAction.extraData));
    }
  }

  return states;
}

/**
 * @param {Object} obj
 * @param {string[]} keysToRemove
 *
 * @return {Object}
 */
function removeProperties(obj, keysToRemove) {
  const result = { ...obj };

  for (const key of keysToRemove) {
    delete result[key];
  }

  return result;
}

/**
 * @param {Object} obj
 * @param {Object} extraData
 *
 * @return {Object}
 */
function addProperties(obj, extraData) {
  return Object.assign({}, obj, extraData);
}

module.exports = transformStateWithClones;
