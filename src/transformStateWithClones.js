'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];

  actions.forEach(elem => {
    let copy = {};

    if (result.length === 0) {
      copy = { ...state };
    } else {
      copy = { ...result[result.length - 1] };
    }

    if (elem.type === 'addProperties') {
      for (const key in elem.extraData) {
        copy[key] = elem.extraData[key];
      }
    } else if (elem.type === 'removeProperties') {
      elem.keysToRemove.forEach(item => {
        delete copy[item];
      });
    } else if (elem.type === 'clear') {
      for (const key in copy) {
        delete copy[key];
      }
    }

    result.push(copy);
  });

  return result;
}

module.exports = transformStateWithClones;
