'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  for (const i in actions) {
    if (actions[i].type === 'addProperties') {
      result[i] = { ...state };

      for (const key in actions[i].extraData) {
        result[i][key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      result[i] = { ...state };

      for (const key in actions[i].keysToRemove) {
        delete result[i][actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      result[i] = {};
    }
  }

  return result;
}

module.exports = transformStateWithClones;

/* function transformStateWithClones(state, actions) {
  const result = [];

  for (const i in actions) {
    if (actions[i].type === 'addProperties') {
      result[i] = { ...state };

      for (const key in actions[i].extraData) {
        result[i][key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      result[i] = { ...state };

      for (const key in actions[i].keysToRemove) {
        delete result[i][actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      result[i] = {};
    }
  }

  return result;
} */

/*
function transformStateWithClones(state, actions) {
  const result = [];

  result[0] = { ...state };

  for (const i in actions) {
    if (actions[i].type === 'addProperties') {
      result[i] = { ...result[i - 1] };

      for (const key in actions[i].extraData) {
        result[i][key] = actions[i].extraData[key];
      }
    }

    if (actions[i].type === 'removeProperties') {
      result[i] = { ...result[i - 1] };

      for (const key in actions[i].keysToRemove) {
        delete result[i][actions[i].keysToRemove[key]];
      }
    }

    if (actions[i].type === 'clear') {
      result[i] = {};
    }
  }

  return result;
} */
