'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // eslint-disable-next-line prefer-const
  let result = [];
  const clone = {};

  for (const key in state) {
    clone[key] = state[key];
  }

  for (const action of actions) {
    switch (true) {
      case (action.type === 'addProperties') :
        Object.assign(clone, action.extraData);
        break;

      case (action.type === 'clear') :
        Object.keys(clone).forEach(key => delete clone[key]);
        break;

      case (action.type === 'removeProperties') :
        for (const removeProperty of action.keysToRemove) {
          // eslint-disable-next-line max-len
          Object.keys(clone).forEach(key => delete clone[removeProperty]);
        }
        break;
    }
    result.push({ ...clone });
  }

  return result;
}

module.exports = transformStateWithClones;
