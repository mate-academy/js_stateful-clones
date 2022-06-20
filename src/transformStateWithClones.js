'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const result = [];
  let copied = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(copied, action.extraData);
        break;

      case 'removeProperties':
        makeRemove(copied, action.keysToRemove);
        break;

      case 'clear':
        clear(copied);
        break;
    }

    result.push({ ...copied });
  }

  return result;
}

function makeRemove(state, props) {
  for (const prop of props) {
    delete state[prop];
  }
}

function clear(state) {
  for (const key in state) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
