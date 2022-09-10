// import { request } from "express";

window.addEventListener('DOMContentLoaded', () => {
    //------------------Tabs

    const tabs = document.querySelectorAll('.tab_header'),
          tabContnet = document.querySelectorAll('.tab_item'),
          tabsParent = document.querySelector('.tab_list');

    function hideTabsContent () {
        tabContnet.forEach (item => {
            item.style.display = 'none';
        })

        tabs.forEach(item => {
            item.classList.remove('.tab_item_active');
        })
    }

    function showTabsContent (i = 0) {
        tabContnet[i].style.display = 'block';
        tabs[i].classList.add('tab_item_active')
    }


    hideTabsContent();
    showTabsContent();

    tabsParent.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab_header')) {
            tabs.forEach((item, i) => {
                if (e.target == item) {
                    hideTabsContent()
                    showTabsContent(i);
                }
            })
        }
    })

    //---------------------Timer

    const promoDeadline = '2022-10-31';

    function getTimeRemaining (endTime) {
        let days, hours, minutes, seconds;
        const timeMS = Date.parse(endTime) - Date.parse(new Date());

        if (timeMS <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0; 
        } else {
            days = Math.floor(timeMS / (1000 * 60 * 60 * 24));
            hours = Math.floor((timeMS / (1000 * 60 *60)) % 24);
            minutes = Math.floor((timeMS / 1000 / 60) % 60);
            seconds = Math.floor((timeMS / 1000) % 60);
        }

        return {
            'total': timeMS,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero (num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setTimer (selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateTimer, 1000);
        
        updateTimer();
        
        function updateTimer () {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t['days']);
            hours.innerHTML = getZero(t['hours']);
            minutes.innerHTML = getZero(t['minutes']);
            seconds.innerHTML = getZero(t['seconds']);

            if (t.total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setTimer('.timer', promoDeadline);

    //-----------------Modal window

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

    function showModal () {
        modal.classList.add('modal_active');
        modal.classList.remove('modal_hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerID)
    }

    function closeModal () {
        modal.classList.remove('modal_active');
        modal.classList.add('modal_hide');
        document.body.style.overflow = '';
    }

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            showModal();
        })
    })

    modalCloseBtn.addEventListener('click', closeModal)

    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('modal_active')) {
            closeModal();
        }
    })

    //Adding modal window by timer below (was commented out, because it prevents of process of developing)
    const modalTimerID = setTimeout(showModal, 2000000);
    

    window.addEventListener('scroll', showModalByScroll);

    //Classes for cards

    class MenuCard {
        constructor (src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.cource = 41;
        }

        changeToUAH () {
            this.price = this.price * this.cource 
        }

        render () {
            const card = document.createElement('div');
            card.classList.add('membership_card');

            card.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <div class="membership_card_info">
                <h4>${this.title}</h4>
                <p>${this.descr}</p>
            </div>
            <div class="membership_card_price">
                <span>Price</span>
                <span>${this.price} UAH/Month</span>
            </div>
            `;

            this.parent.append(card);
        }
    }

    new MenuCard(
        'img/cards/solo.jpg',
        'Solo training',
        'Standart mebmership',
        'Standard subscription for 30 days of self-work in the gym.',
        200,
        '.membership_cards'
    ).render();

    new MenuCard(
        'img/cards/trainer.jpg',
        'Training with trainer',
        'Month of coaching',
        'Training with a professional trainer according to an individually designed program.',
        1000,
        '.membership_cards'
    ).render();

    new MenuCard(
        'img/cards/pool.jpg',
        'Pool',
        'Swimming pool for a month',
        'Classes in the pool on the territory of our sports complex.',
        350,
        '.membership_cards'
    ).render();
})

//Forms

const forms = document.querySelectorAll('form');

const message = {
    loading: 'Loading...',
    success: 'Thank you! We will contact you asap!',
    failure: 'Something was going wrong'
}

forms.forEach(item => {
    postData(item);
})

function postData (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        statusMessage.textContent = message.loading;
        form.append(statusMessage);

        const req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:3000/api/server');
        req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        const formData = new FormData(form);
        const object = {};

        formData.forEach(function(value, key){
            object[key] = value;
        })

        const json = JSON.stringify(object);

        req.send(json);
        req.addEventListener('load', () => {
            if (req.status === 201) {
                console.log('request sended')
                statusMessage.textContent = message.success;
                form.reset();
                setTimeout(() => {
                    statusMessage.remove();
                })
            } else {
                statusMessage.textContent = message.failure;
            }
        })
    })
}