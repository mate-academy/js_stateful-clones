'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const newArr = [];
  let newSta = { ...state };

  for (const action of actions) {
    if (action.type === 'addProperties') {
      newSta = {
        ...newSta, ...action.extraData,
      };
    } else if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete newSta[key];
      }
    } else if (action.type === 'clear') {
      newSta = {};
    }

    newArr.push({ ...newSta });
  }

  return newArr;
}
module.exports = transformStateWithClones;
/** Напишіть функцію transformStateWithClones, яка приймає об’єкт стану
 *  та масив дій і повертає
  масив такої ж довжини, що й дії, що містять усі попередні версії стану.
   Кожен елемент
 * результуючого масиву має представляти стан, створений наступною операцією.

ВАЖЛИВО! Ви не повинні жодним чином змінювати об’єкт початкового стану!

стан є початковим об'єктом. Воно повинно завжди залишатися незмінним.

дії — це масив об’єктів. Кожен об’єкт у цьому масиві має такі властивості:

тип містить рядок: «addProperties», «removeProperties» або «clear»;
Друга властивість кожного об’єкта залежить від типу та може
бути однією з наступних:
якщо тип — addProperties, друга властивість — extraData.
Він містить об’єкт із парами ключів:
значень для додавання до стану;
якщо тип – removeProperties, друга властивість – keysToRemove.
Він містить масив зі списком імен
властивостей (ключів), які потрібно видалити зі стану;
(Неіснуючі властивості слід ігнорувати)
якщо тип зрозумілий, вам слід створити порожній об’єкт
 стану. У цьому випадку немає другої
властивості;
Приклад використання: */
