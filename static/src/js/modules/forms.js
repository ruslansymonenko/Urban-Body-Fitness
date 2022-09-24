export function forms () {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading...',
        success: 'Thank you! We will contact you asap!',
        failure: 'Something was going wrong'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await result.json();
    };

    function bindPostData (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('div');
            statusMessage.textContent = message.loading;
            form.append(statusMessage);

            const formData = new FormData(form);
            const object = {};

            formData.forEach(function(value, key){
                object[key] = value;
            })

            const json = JSON.stringify(object);

            postData('http://localhost:3000/api/server', json)
            .then(data => {
                console.log('request sent')
                statusMessage.textContent = message.success;
                setTimeout(() => {
                statusMessage.remove()
                }, 3000)
            }).catch(() => {
                statusMessage.textContent = message.failure;
            }).finally(() => {
                form.reset();
            });
        })
    };
}