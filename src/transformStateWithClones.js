'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const obj = {};

  Object.assign(obj, state);

  const massAction = [];

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      Object.assign(obj, actions[i].extraData);
    }

    if (actions[i].type === 'removeProperties') {
      const mass = actions[i].keysToRemove;

      for (let keys = 0; keys < mass.length; keys++) {
        Reflect.deleteProperty(obj, mass[keys]);
      }
    }

    if (actions[i].type === 'clear') {
      for (const q in obj) {
        delete obj[q];
      }
    }

    massAction.push({ ...obj });
  }

  return massAction;
}

module.exports = transformStateWithClones;
