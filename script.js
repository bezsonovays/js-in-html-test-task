// Підготувати адаптивну верстку сторінки для умовного сайту-каталогу
// зображень.
// Після завантаження сторінки в браузері js звертається до серверу, отримує
// відповідь бекенду на основі якої і будується все відображення.
// Featured містить 5 елементів з найкращим рейтингом,
// Last містить 2 самих нових елементів

const slider = document.querySelector('.featured__slider');
const last = document.querySelector('.last__block');

const getData = async () => {
      return  await fetch('./data.json')
                .then(res => res.json())
                .then(data => data)
    }

const createContent = async () => {
    let result = await getData();
    console.log(result)

    let featuredTemplate = '';
    let lastTemplate = '';

    let raitingSort = JSON.parse(JSON.stringify(result)).sort((a,b) =>a.rating - b.rating);
    raitingSort.forEach(({image, tags, title}, index) => {
        if(index < 5) {
                featuredTemplate += `
                    <div class="featured__slide area${index + 1} ${index === 0 ? 'active' : ''}  top" style="background-image: url('${image}')">
                        <div class="slide__info">
                            <h4 class="slide__title">${title}</h4>
                            <div class="slide__tags">`
                            tags.forEach(tag => featuredTemplate += `<span>#${tag}</span> `);
                featuredTemplate += `</div></div></div>`
        }
    });
    slider.innerHTML = featuredTemplate;

    let lastSort = JSON.parse(JSON.stringify(result)).sort((a,b) =>a.age - b.age);
    lastSort.forEach(({image, tags, title}, index) => {
        if(index < 2) {
            lastTemplate += `
                        <div class="last__item">
                            <div class="item__img">
                                <img src="${image}" alt="${title}">
                            </div>
                            <div class="item__info">
                                <h4 class="item__title">${title}</h4>
                                <div class="item__tags">`
                                tags.forEach(tag => lastTemplate += `<span>#${tag}</span> `);
            lastTemplate += `</div></div></div>`
        }
     })
     last.innerHTML = lastTemplate;
}

const sortElements = async () => {
    await createContent();

    // 1. Визначити загальну кількість елементів у DOM-дереві.
    const elementsArr = document.querySelectorAll('*');
    console.log(`1. Загальна кількість елементів - ${elementsArr.length}`)

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
        console.log(tagsCount);

    // 3. Згрупувати елементи за кількістю символів у назві тегу, визначити
    // кількість елементів.
    let tagLength = [];
    elementsArr.forEach(tag => tagLength.push(tag.tagName.length))
    console.log(tagLength)

    let result = {};
    for (let i = 0; i < tagLength.length; ++i) {
        var a = tagLength[i];
        if (result[a] != undefined)
            ++result[a];
        else
            result[a] = 1;
    }
    
    for (let key in result)
     console.log(`${key} символа(ів) в tag = ${result[key]} разів`);
    }

sortElements();
