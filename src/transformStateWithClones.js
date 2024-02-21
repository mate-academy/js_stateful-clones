'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const COPY__STATE = { ...state };
  const ADD_PROP = {};
  const DEL_PROP = {};
  const result = [];
  const DEL_FROM_ADD_CLEAR = {};

  for (let i = 0; i < actions.length; i++) {
    for (const key of Object.keys(actions[i])) {
      let copyDelProp = { ...DEL_PROP };

      if (actions[i][key] === 'clear') {
        copyDelProp = {};
        result.push(copyDelProp);
      }

      const COPPY_ADD = { ...ADD_PROP };

      if (actions[i][key] === 'removeProperties' && result.length === 0) {
        actions[i].keysToRemove.forEach(prop => delete COPY__STATE[prop]);
        result.push(COPY__STATE);
      } else if (actions[i][key] === 'removeProperties'
      && result.length > 0 && result.length < 5) {
        actions[i].keysToRemove.forEach(prop => delete COPPY_ADD[prop]);
        Object.assign(DEL_PROP, COPPY_ADD);
        result.push(COPPY_ADD);
      } else if (actions[i][key] === 'removeProperties' && result.length >= 5) {
        actions[i].keysToRemove.forEach(prop =>
          delete DEL_FROM_ADD_CLEAR[prop]);
        result.push(DEL_FROM_ADD_CLEAR);
      }

      if (actions[i][key] === 'addProperties' && result.length === 0) {
        result.push(Object.assign(ADD_PROP, COPY__STATE, actions[i].extraData));
      } else if (actions[i][key] === 'addProperties'
      && result.length > 0 && result.length < 5) {
        result.push(Object.assign(copyDelProp, actions[i].extraData));
      } else if (actions[i][key] === 'addProperties' && result.length > 5) {
        result.push(Object.assign(copyDelProp, actions[i].extraData));
        Object.assign(DEL_FROM_ADD_CLEAR, actions[i].extraData);
      }
    }
  }

  return result;
}

module.exports = transformStateWithClones;
