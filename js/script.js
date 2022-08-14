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
        const timeMS = Date.parse(endTime) - Date.parse(new Date()),
              days = Math.floor(timeMS / (1000 * 60 * 60 * 24)),
              hours = Math.floor((timeMS / (1000 * 60 *60)) % 24),
              minutes = Math.floor((timeMS / 1000 / 60) % 60),
              seconds = Math.floor((timeMS / 1000) % 60);

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

    setTimer('.timer', promoDeadline)
})