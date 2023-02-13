'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  const clone = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        Object.assign(clone, action.extraData);
        break;
      case 'removeProperties':
        removeProps(clone, action.keysToRemove);
        break;
      case 'clear':
        removeProps(clone, Object.keys(clone));
    }
    history.push({ ...clone });
  }

  return history;
}

/**
 * @param {Object} obj
 * @param {String[]} props
 */
function removeProps(obj, props) {
  props.forEach(key => {
    delete obj[key];
  });
}

module.exports = transformStateWithClones;
