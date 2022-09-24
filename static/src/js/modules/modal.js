export function modal () {
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


    function showThanksModal (message) {
    const prevModalDialog = document.querySelector('.modal_dialog_content');

    prevModalDialog.classList.add('modal_hide');

    const thanksModal = document.createElement('div');
    
    forms.forEach(item => {
        item.style.height = '0px';
    })
    thanksModal.classList.add('modal_content');
    thanksModal.innerHTML = `
        <div class='modal_title'>${message}</div>
    `;

    showModal();

    document.querySelector('.modal_content').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('modal_active');
        prevModalDialog.classList.remove('modal_hide');
        forms.forEach(item => {
            item.style.height = '290px';
        })
        closeModal();
    }, 4000)
    }

    //Adding modal window by timer below (was commented out, because it prevents of process of developing)
    const modalTimerID = setTimeout(showModal, 2000000);


    window.addEventListener('scroll', showModalByScroll);
}