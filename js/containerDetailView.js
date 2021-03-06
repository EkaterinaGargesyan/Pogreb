"use strict";

import { handlerForSubmitEvent } from "./onSubmit";

/**
 * Add container detail view.
 */

var addDetailView = (btn, nameForm, targetGA) => {
  var detailView = {
    safePopUp: {
      title: "Квест-комната \"Сейф Банкира\"",
      text: "Хотите почувствовать себя в роли Джокера, самого яркого представителя преступного мира? Для этого не обязательно красить волосы в зеленый цвет!Достаточно пройти квест-комнату \"Сейф Банкира\"!\n" +
      "Только представьте в своих руках десятки тысяч... нет! Миллионы долларов!!!\n" +
      "Да-да, это не сон. Вы всё учли, смогли пробраться в хранилище одного из самых крупных банков, прорыв туннель и предусмотрев все преграды, но... не учли одну ловушку и внезапно срабатывает система безопасности. Двери автоматически закрываются, срабатывает сигнализация - Вы взаперти.\n" +
      "Вы в растерянности, неужели из-за этой небольшой оплошности ваши планы разрушаться и вас поймают?\n" +
      "Но выход есть всегда, нужно лишь обнаружить правильные подсказки, забрать богатство до прихода полиции!\n" +
      "А главный враг - это время. Действуйте! У Вас всего 60 минут!"
    },
    ventilationPopUp: {
      title: "Квест-комната \"Вентиляционная\"",
      text: "Вы давно заметили в центре города странное здание вокруг которого ходит много легенд и историй. \"77 завод” завод “Гамма” - все знают, что это за здание. Но ни Вы, ни Ваши друзья никогда не были внутри. Что там? Ваше любопытство в очередной раз привело Вас к этому строению, немного побродив вокруг Вы нашли странную дыру в основании здания, заглянув туда стало понятно, что залезть можно. 2 минуты и Вы с друзьями внутри в странном помещении…\n" +
      "Несколько дверей, странные проходы и вы заметили горящую лампочку и гул работающей вентиляции. Странно, что тут до сих пор горит свет и что-то работает. Вы прошли очередную дверь и тот кто шел последним, по ошибке захлопнул ее!\n" +
      "Шум вентиляции стал ближе и через пару минут Вы поняли, что эта огромная вытяжка. Большой вентилятор вытягивает воздух из помещения!\n" +
      "Нужно поскорее выбираться отсюда! Но что-то подсказывает, что это не последняя ловушка в этом здании…"
    },
    controlCenterPopUp: {
      title: "Квест-комната \"Центр Управления\"",
      text: "Это продолжение квеста \"77-й завод\" - 2-я серия. Если Вы прошли квест-рум \"Вентиляционная\", Вы знаете часть истории про рабочих, которые оставили массу шифров и разных загадок после себя.\n" +
      "Но зачем им необходимо было прятаться, что сподвигло их на этот шаг? Почему они не выбрались и почему писали так много писем? Где они сейчас? Что с ними произошло?\n" +
      "Вас не могут не беспокоить эти вопросы, так как Ваша жизнь зависит от того, найдете ли Вы на них ответы.\n" +
      "Вперед, у Вас 60 минут!"
    }
  };

  var containerDetailView = document.createElement("div");
  containerDetailView.classList.add("quest__info_descr_continue");
  containerDetailView.innerHTML =
  `<p class="quest__info_descr_continue-title">${detailView[btn.id].title}</p>
   <button class="close"></button>
   <p class="quest__info_descr_continue-text">${detailView[btn.id].text}</p>

   <form class="quest__info_descr_continue-form" 
         name="${nameForm}"
         data-target=${targetGA}
         onsubmit="_gaq.push(['_trackEvent', 'FormPopup','${targetGA}']); return true;"
   >
     <input type="text" name="nameUser" placeholder="Ваше Имя и Фамилия *" minlength="2" pattern="[A-zА-яЁё \s]+" required>
     <input type="tel" name="phoneUser" required placeholder="Ваш Телефон *">
     <button class="order" type="submit">Забронировать</button>
   </form>`;

  btn.parentElement.appendChild(containerDetailView);

  var form = containerDetailView.lastElementChild;
  form.addEventListener("submit", (event) => handlerForSubmitEvent(event));
};

/**
 * Remove container detail view.
 */

var removeDetailView = (el) => el.parentElement.removeChild(el);

/**
 * Button-click handler for render container detail view.
 */

[].forEach.call(document.querySelectorAll(".continue"), (element) => {
  element.addEventListener("click", (event) => {
    event.stopPropagation();
    var btn = event.target;
    var nameForm = btn.parentElement.nextElementSibling.name;
    var targetGA = btn.parentElement.nextElementSibling.getAttribute("data-target");

    addDetailView(btn, nameForm, targetGA);

    document.addEventListener("click", (event) => {
      var containerDetailView = document.querySelector(".quest__info_descr_continue");
      if (containerDetailView) {
        if (!containerDetailView.contains(event.target)
            || event.target.classList.contains("close")){
          removeDetailView(containerDetailView)
        }
      }
    });
  });
});

