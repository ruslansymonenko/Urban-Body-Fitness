export function calculator () {
    const caloriesResultContainer = document.querySelector('.calories_result');
    let userGender, userHeight, userWeight, userAge, ratio;

    if (localStorage.getItem('gender')) {
        userGender = localStorage.getItem('gender');
    };

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    };


    function innitLocalSettings (selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('gender')) {
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        })
    }

    function calcTotal () {
        if (!userGender || !userHeight || !userWeight || !userAge || !ratio) {
            caloriesResultContainer.textContent = '____';
            return;
        }

        if (userGender === 'female') {
            caloriesResultContainer.textContent = Math.round((447.6 + (9.2 * userWeight) + (3.1 * userHeight) - (4.3 * userAge)) * ratio);
        } else {
            caloriesResultContainer.textContent = Math.round((88.36 + (13.4 * userWeight) + (4.8 * userHeight) - (5.7 * userAge)) * ratio);
        }
    };

    function getStaticInfo (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} button`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    userGender = e.target.getAttribute('id');
                    localStorage.setItem('gender', e.target.getAttribute('id'));
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
    
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        })
    };

    function getDynamicInfo (selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    userHeight = +input.value;
                    break;
                case 'weight':
                    userWeight = +input.value;
                    break;
                    case 'age':
                        userAge = +input.value;
                        break;
            }

            calcTotal();
        });
    };

    innitLocalSettings('.male_btns button', 'calculator_btn_active');
    innitLocalSettings('.activity_btns button', 'calculator_btn_active');
    calcTotal();
    getStaticInfo('.male_btns', 'calculator_btn_active');
    getStaticInfo('.activity_btns', 'calculator_btn_active');
    getDynamicInfo('#height');
    getDynamicInfo('#weight');
    getDynamicInfo('#age');
}