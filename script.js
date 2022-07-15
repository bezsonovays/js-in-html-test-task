// Підготувати адаптивну верстку сторінки для умовного сайту-каталогу  зображень.
// Після завантаження сторінки в браузері js звертається до серверу, отримує
// відповідь бекенду на основі якої і будується все відображення.
// Featured містить 5 елементів з найкращим рейтингом,
// Last містить 2 самих нових елементів

const slider = document.querySelector('.slider__block');
const last = document.querySelector('.last__block');
const wrapper = document.querySelector('.wrapper');

const getData = async () => {
       return  await fetch('./data.json')
                .then(res => res.json())
                .then(data => data)
                .catch(error => console.log(error))
    }

const createContent = async () => {
    let loader = '<div class="loader__wrapper"><div class="loader"></div></div>';
    slider.innerHTML = loader;
    last.innerHTML;
    
    let result = await getData();
    console.log(result)

    let featuredTemplate = '';
    let lastTemplate = '';

    const raitingSort = JSON.parse(JSON.stringify(result)).sort((a,b) =>a.rating - b.rating);
    raitingSort.forEach(({image, tags, title}, index) => {
        if(index < 5) {
                featuredTemplate += `
                    <article class="slider__item card area${index + 1} ${index === 0 ? 'active' : ''}  star ">
                        <img src="${image}" alt="${title}">
                        <div class="slide__info">
                            <h4 class="slide__title">${title}</h4>
                            <div class="slide__tags">`
                            tags.forEach(tag => featuredTemplate += `<span>#${tag}</span> `);
                featuredTemplate += `</div></div></article>`
        }
    });
    slider.innerHTML = featuredTemplate;

    const lastSort = JSON.parse(JSON.stringify(result)).sort((a,b) =>a.age - b.age);
    lastSort.forEach(({image, tags, title}, index) => {
        if(index < 2) {
            lastTemplate += `
                        <article class="last__item card star" )>
                            <div class="item__img">
                                <img src="${image}" alt="${title}">
                            </div>
                            <div class="item__info">
                                <h4 class="item__title">${title}</h4>
                                <div class="item__tags">`
                                tags.forEach(tag => lastTemplate += `<span>#${tag}</span> `);
            lastTemplate += `</div></div></article>`
        }
     })
     last.innerHTML = lastTemplate;
}

const sortElements = async () => {
    await createContent();

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', ({currentTarget}) => {
            !currentTarget.matches('.top') ? currentTarget.classList.add('top') : currentTarget.classList.remove('top')
        })
    })


    // 1. Визначити загальну кількість елементів у DOM-дереві.
    const elementsArr = document.querySelectorAll('*');
    console.log(`Загальна кількість елементів - ${elementsArr.length}`)

    // 2. Згрупувати елементи за назвою тегу, визначити кількість елементів для
    // кожного тегу.
        let tagsCount = {};
        elementsArr.forEach(el => {
            if(!tagsCount[el.tagName]) {
                tagsCount =  {...tagsCount, [el.tagName]: 1}
            } else {
            Object.keys(tagsCount).forEach(key => {
                if (key === el.tagName) {
                        tagsCount[el.tagName]++}
                    })
                }   
            })

     for (let tag in tagsCount) {
        console.log(`${tag} = ${tagsCount[tag]} раз(ів) зустрічається`);
    }

    // 3. Згрупувати елементи за кількістю символів у назві тегу, визначити
    // кількість елементів.
    let tagLength = [];
    elementsArr.forEach(tag => tagLength.push(tag.tagName.length))

    let result = {};
    tagLength.forEach(el => !result[el] ? result[el] = 1 : result[el]++ )

     for (let key in result)
        console.log(`${key} символа(ів) в tag = ${result[key]} разів`);
    }

sortElements();


