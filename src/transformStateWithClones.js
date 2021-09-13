'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const clone = [];
  let obj = state;

  for (const command of actions) {
    if (command.type === 'addProperties') {
      const temp = Object.assign({}, obj, command.extraData);

      clone.push(temp);
      obj = temp;
    }

    if (command.type === 'removeProperties') {
      const del = Object.assign({}, obj);

      for (const key of command.keysToRemove) {
        delete del[key];
      }

      clone.push(del);
      obj = del;
    }

    if (command.type === 'clear') {
      clone.push({});
      obj = {};
    }
  }

  return clone;
}

module.exports = transformStateWithClones;
