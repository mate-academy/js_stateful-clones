'use strict';
/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */

function transformStateWithClones(state, actions) {
  const report = [];

  for (const action of actions) {
    const stateClone =
      report.length === 0 ? { ...state } : { ...report[report.length - 1] };

    const actionResult = () => {
      switch (action.type) {
        case 'addProperties':
          return addProperties(stateClone, action.extraData);

        case 'removeProperties':
          return removeProperties(stateClone, action.keysToRemove);

        case 'clear':
          return clearObject(stateClone);

        default:
          return stateClone;
      }
    };

    report.push(actionResult());
  }

  return report;
}

function addProperties(obj, data) {
  return { ...obj, ...data };
}

function removeProperties(obj, keys) {
  for (const key of keys) {
    delete obj[key];
  }

  return obj;
}

function clearObject(obj) {
  for (const property in obj) {
    delete obj[property];
  }

  return obj;
}

module.exports = transformStateWithClones;
