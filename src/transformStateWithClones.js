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
  let lastState = state;

  for (const action of actions) {
    const { type, keysToRemove, extraData } = action;

    switch (type) {
      case ACTION_TYPES.clear:
        lastState = {};
        break;
      case ACTION_TYPES.removeProperties:
        lastState = removeProperties(lastState, keysToRemove);
        break;
      case ACTION_TYPES.addProperties:
        lastState = addProperties(lastState, extraData);
    }

    states.push(lastState);
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
