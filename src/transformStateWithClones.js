'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const result = [];
  const clone = {};

  Object.assign(clone, state);

  for (let i = 0; i < actions.length; i++) {
    if (actions[i].type === 'addProperties') {
      const prop = Object.keys(actions[i].extraData);

      for (let p = 0; p < prop.length; p++) {
        clone[prop[p]] = actions[i].extraData[prop[p]];
      }

      result.push(Object.assign({}, clone));
    } else if (actions[i].type === 'removeProperties') {
      const deletedProperties = actions[i].keysToRemove;

      for (let d = 0; d < deletedProperties.length; d++) {
        delete clone[deletedProperties[d]];
      }

      result.push(Object.assign({}, clone));
    } else {
      const clear = Object.keys(clone);

      for (let c = 0; c < clear.length; c++) {
        delete clone[clear[c]];
      }
      result.push(Object.assign({}, clone));
    }
  }

  return result;
}

module.exports = transformStateWithClones;
