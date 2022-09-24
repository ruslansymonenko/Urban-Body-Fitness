export function cards () {
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

    const getCards = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw Error(`Could not fetch ${url}, status ${res.status}`);
        }
    
        return await result.json();
    };

    getCards('http://localhost:3000/api/cards')
        .then(data => {
            data.forEach(({src, alt, title, descr, price}) => {
                new MenuCard(src, alt, title, descr, price, '.membership_cards').render();
            })
        })
}