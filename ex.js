window.onload = function () {
    setTimeout(function () {
        var popup = document.getElementById('myPopup');
        if (popup) popup.style.display = 'block';
    }, 1000);
};

var closeBtn = document.getElementById('closePopup');
if (closeBtn) {
    closeBtn.onclick = function () {
        var popup = document.getElementById('myPopup');
        if (popup) popup.style.display = 'none';
    };
}
var regForm = document.getElementById('regForm');
if (regForm) {
    regForm.onsubmit = function (e) {
        e.preventDefault();
        var errorDiv = document.getElementById('formErrors');
        if (errorDiv) errorDiv.innerHTML = '';
        var errors = [];

        var fullname = document.getElementById('fullname');
        if (fullname && fullname.value.trim().length < 2) {
            errors.push('Имя должно быть не короче 2 символов');
        }

        var password = document.getElementById('password');
        if (password) {
            if (!/\d/.test(password.value)) errors.push('Пароль должен содержать хотя бы одну цифру');
            if (!/[A-Z]/.test(password.value)) errors.push('Пароль должен содержать хотя бы одну заглавную букву');
            if (!/[a-z]/.test(password.value)) errors.push('Пароль должен содержать хотя бы одну строчную букву');
        }

        if (errors.length > 0 && errorDiv) {
            errorDiv.innerHTML = errors.map(function (err) {
                return '<div style="color:red; margin:5px 0;">' + err + '</div>';
            }).join('');
            return false;
        }

        var expDate = new Date();
        expDate.setTime(expDate.getTime() + 24 * 60 * 60 * 1000);
        if (fullname) {
            document.cookie = "username=" + encodeURIComponent(fullname.value) +
                "; expires=" + expDate.toUTCString() +
                "; path=/";
            alert('Регистрация успешна! Имя сохранено в cookie.');
            var popup = document.getElementById('myPopup');
            if (popup) popup.style.display = 'none';
        }
        return true;
    };
}
function openInfoPopup(title, content) {
    var oldPopup = document.getElementById('customInfoPopup');
    if (oldPopup) oldPopup.remove();

    var overlay = document.createElement('div');
    overlay.id = 'customInfoPopup';
    overlay.className = 'info-popup-overlay';

    var popupWindow = document.createElement('div');
    popupWindow.className = 'info-popup';

    var header = document.createElement('div');
    header.className = 'info-popup-header';
    header.innerHTML = '<span>' + title + '</span><button id="closeInfoBtn" class="info-popup-close">×</button>';

    var body = document.createElement('div');
    body.className = 'info-popup-body';
    body.innerHTML = content;

    popupWindow.appendChild(header);
    popupWindow.appendChild(body);
    overlay.appendChild(popupWindow);
    document.body.appendChild(overlay);

    var closeInfoBtn = document.getElementById('closeInfoBtn');
    if (closeInfoBtn) {
        closeInfoBtn.onclick = function () {
            overlay.remove();
        };
    }

    overlay.onclick = function (e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    };
}
function openQuizPopup() {
    var oldQuiz = document.getElementById('quizPopup');
    if (oldQuiz) oldQuiz.remove();

    var overlay = document.createElement('div');
    overlay.id = 'quizPopup';
    overlay.className = 'info-popup-overlay';

    var popupWindow = document.createElement('div');
    popupWindow.className = 'info-popup';
    popupWindow.style.width = '450px';

    var header = document.createElement('div');
    header.className = 'info-popup-header';
    header.innerHTML = '<span>Викторина о строительстве</span><button id="closeQuizBtn" class="info-popup-close">×</button>';

    var body = document.createElement('div');
    body.className = 'info-popup-body';

    var quizHTML = document.getElementById('quizContainer');
    if (quizHTML) {
        var clone = quizHTML.cloneNode(true);
        clone.style.display = 'block';
        body.appendChild(clone);
    } else {
        body.innerHTML = 'Ошибка загрузки викторины';
    }

    popupWindow.appendChild(header);
    popupWindow.appendChild(body);
    overlay.appendChild(popupWindow);
    document.body.appendChild(overlay);

    document.getElementById('closeQuizBtn').onclick = function () {
        overlay.remove();
    };

    overlay.onclick = function (e) {
        if (e.target === overlay) overlay.remove();
    };

    var quizButton = overlay.querySelector('#submitQuiz');
    if (quizButton) {
        quizButton.onclick = function () {
            var q1 = overlay.querySelector('input[name="q1"]:checked');
            var q2 = overlay.querySelector('input[name="q2"]:checked');
            var q3 = overlay.querySelector('input[name="q3"]:checked');
            var q4 = overlay.querySelector('input[name="q4"]:checked');
            var q5 = overlay.querySelector('input[name="q5"]:checked');
            var q6 = overlay.querySelector('input[name="q6"]:checked');
            var q7 = overlay.querySelector('input[name="q7"]:checked');
            var q8 = overlay.querySelector('input[name="q8"]:checked');
            var q9 = overlay.querySelector('input[name="q9"]:checked');
            var q10 = overlay.querySelector('input[name="q10"]:checked');
            var q11 = overlay.querySelector('input[name="q11"]:checked');
            var q12 = overlay.querySelector('input[name="q12"]:checked');
            var correct = 0;
            var total = 12;

            if (q1 && q1.value === '2011') correct++;
            if (q2 && q2.value === 'строить') correct++;
            if (q3 && q3.value === 'бетон') correct++;
            if (q4 && q4.value === 'бетон') correct++;
            if (q5 && q5.value === 'смр') correct++;
            if (q6 && q6.value === 'проект') correct++;
            if (q7 && q7.value === 'генплан') correct++;
            if (q8 && q8.value === 'фундамент') correct++;
            if (q9 && q9.value === 'прораб') correct++;
            if (q10 && q10.value === 'расчёт') correct++;
            if (q11 && q11.value === 'нью-йорк') correct++;
            if (q12 && q12.value === 'партнёр') correct++;

            var resultDiv = overlay.querySelector('#quizResult');
            if (resultDiv) {
                if (correct === total) {
                    resultDiv.innerHTML = 'Отлично! Вы ответили правильно на все ' + total + ' вопросов!';
                    resultDiv.style.color = 'green';
                } else {
                    resultDiv.innerHTML = 'Вы ответили правильно на ' + correct + ' из ' + total + ' вопросов. Попробуйте ещё раз!';
                    resultDiv.style.color = 'orange';
                }
            }
        };
    }
}
var navLinks = document.querySelectorAll('.nav-link');

for (var i = 0; i < navLinks.length; i++) {
    var link = navLinks[i];
    link.addEventListener('click', function (e) {
        e.preventDefault();
        var text = this.textContent.trim();

        if (text === 'HOME') {
            openInfoPopup('Главная', 'Привет! Это компания KONSTRUT. Мы занимаемся строительством и управляем разными проектами. Наша цель — делать качественные и надёжные здания.');
        } else if (text === 'ABOUT') {
            openInfoPopup('О компании', 'KONSTRUT основали в 2011 году. Мы строим уже больше 10 лет и за это время стали одними из лучших в своём деле. Главное для нас — качество и современные технологии.');

            setTimeout(function () {
                var popupBody = document.querySelector('#customInfoPopup .info-popup-body');
                if (popupBody && !document.getElementById('quizBtnAdded')) {
                    var quizBtn = document.createElement('button');
                    quizBtn.id = 'quizBtnAdded';
                    quizBtn.textContent = 'Пройти викторину';
                    quizBtn.className = 'quiz-btn';
                    quizBtn.onclick = function () {
                        openQuizPopup();
                    };
                    popupBody.appendChild(quizBtn);
                }
            }, 50);
        } else if (text === 'SERVICES') {
            openInfoPopup('Услуги', 'Мы предлагаем:\n- Управление стройкой\n- Проверку зданий и их обслуживание\n- Строительство заводов и 3D-моделирование\n- Индивидуальный подход к каждому заказчику');
        }
        else if (text === 'WORK') {
            openInfoPopup('Наши работы', 'Вот что мы уже сделали:\n- Жилой комплекс "Берёзовая роща"\n- Торговый центр "Гранд Плаза"\n- Мост через реку Быстрая\n- Промышленный парк "Технополис"');
        } else if (text === 'CONTACT') {
            openInfoPopup('Контакты', 'Напишите или позвоните нам:\nАдрес: 213 Baker Street\nТелефон: +23 994 233 4022\nEmail: info@konstruct.com\nРаботаем: с 9 до 18, с понедельника по пятницу');
        } else {
            openInfoPopup('Информация', 'Раздел "' + text + '" пока не работает, но скоро всё появится!');
        }
    });
}
var getInTouchBtn = document.querySelector('.hero-description2');
if (getInTouchBtn) {
    getInTouchBtn.onclick = function (e) {
        e.preventDefault();
        openInfoPopup('Помощник', 'Оставьте заявку, и мы свяжемся с вами в ближайшее время. Вместе построим ваше будущее!');
    };
}
var allServicesBtn = document.querySelector('.btn-all-services');
if (allServicesBtn) {
    allServicesBtn.onclick = function (e) {
        e.preventDefault();
        openInfoPopup('Наши услуги', 'Мы предлагаем полный цикл строительных услуг: от проектирования до сдачи под ключ.');
    };
}
