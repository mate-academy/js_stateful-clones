'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistoryArr = [];
  const stateCopy = Object.assign({}, state);
  const actionClear = 'clear';
  const actionAddProperties = 'addProperties';
  const actionRemoveProperties = 'removeProperties';
  let whatToRemove = [];
  let whatToAdd = {};
  let typeOfAction = '';
  let countHistoryArr = 0;

  for (const action of actions) {
    typeOfAction = action.type;

    switch (typeOfAction) {
      case actionClear:
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case actionRemoveProperties:
        whatToRemove = action.keysToRemove;

        for (const key of whatToRemove) {
          if (stateCopy[key]) {
            delete stateCopy[key];
          }
        }
        break;

      case actionAddProperties:
        whatToAdd = action.extraData;

        Object.assign(stateCopy, whatToAdd);
        break;

      default:
        window.alert('Action not valid. Nothing to do');
        ;
    }

    stateHistoryArr[countHistoryArr] = { ...stateCopy };
    countHistoryArr++;
  }

  return stateHistoryArr;
}

module.exports = transformStateWithClones;
