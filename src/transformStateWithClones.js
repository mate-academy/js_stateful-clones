'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  const firstState = {...state};
  const arrAfterActions = [];
  actions.forEach(el => {
    for (const type in el) {
      switch (el[type]) {
        case 'addProperties':
          Object.assign(firstState, { ...el.extraData });
          arrAfterActions.push({...firstState});
          break;
          case 'clear':
            for (const prop in firstState) {
              delete firstState[prop];
            }
            arrAfterActions.push({...firstState});
            break;
            case 'removeProperties':
              el.keysToRemove.forEach(prop => {
                delete firstState[prop];
               })
               arrAfterActions.push({...firstState});
              break;
        default:
          return 'error';
      }

    }
  });

  return arrAfterActions;
}

module.exports = transformStateWithClones;
