const loadAllNews = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = res.json();
        return data;
    }
    catch (e) {
        console.log('The main API is not connected');
    }

}

// Category Section
const catagoriMenu = async () => {
    const data = await loadAllNews();
    const newsData = data.data.news_category;

    const catagoryMenu = document.getElementById('catagory-menu');

    try {
        for (const news of newsData) {
            const li = document.createElement('li');
            li.innerHTML = `
        <a onclick="someNews('${news.category_id}')" class="px-8 text-lg cursor-pointer">${news.category_name}</a>
        `;
            catagoryMenu.appendChild(li);
        }

    }
    catch (e) {
        console.log('catagory names not found');
    }
}

const someNews = (category_id) => {

    // Start Loader or Spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => diaplayNews(data.data))
    }
    catch (e) {
        console.log('Catagori Id not found');
    }

}

// News Card section
const diaplayNews = (newsCard) => {
    const showNews = document.getElementById('show-news');
    const notFound = document.getElementById('not-found');
    showNews.textContent = '';
    notFound.textContent = '';

    // Stop Loader or Spinner
    spinner.classList.add('hidden');

    if (newsCard.length === 0) {
        notFound.innerHTML = `
        <h2 class="text-4xl text-teal-500 text-center">Not Found Any News</h2>
        `;
        return;
    }

    // Sort The Top News
    let sort = newsCard.sort((a, b) =>
        b.total_view - a.total_view);

    const cardNumber = document.getElementById('card-number');
    cardNumber.value = `
        ${sort.length} News Found On This Catagory
        `;

    sort.forEach(cardNews => {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <figure class="p-5">
             <img src="${cardNews.thumbnail_url}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title text-white">${cardNews.title}</h2>            
            <p class="text-white">${cardNews.details.slice(0, 120) + '...'}</p>
            <div class="card-actions">
            <img style="height: 50px; width: 50px;" src="${cardNews.author.img}" alt="Shoes" class="rounded-xl" />
            <p>${cardNews.author.name ? cardNews.author.name : 'Name not found'}</p>
            <p><i class="fa-solid fa-eye"></i> ${cardNews.total_view ? cardNews.total_view : 00}</p>
                <label onclick="modalView('${cardNews._id}')" for="my-modal-3" class="btn btn-primary modal-button"><i class="fa-solid fa-arrow-right-long"></i></label>
            </div>
        </div>
        `;
        showNews.appendChild(newsDiv);
    })
    
}

// Modal Section
const modalView = news_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`
        fetch(url)
            .then(res => res.json())
            .then(data => topNews(data.data[0]))
    }
    catch (e) {
        console.log('Modal Not Found');
    }

}

const topNews = hotNews => {
    const modalNews = document.getElementById('modal-news');
    modalNews.innerHTML = `
    <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <div class="flex">
        <img src="${hotNews.thumbnail_url}" alt="Shoes" class="rounded-xl"/>
        <h3 class="text-2xl font-bold p-4">${hotNews.title}</h3>
        </div>
        <p class="py-4">${hotNews.details.slice(0, 350) + '...'}</p>
    </div>
    `;
}

catagoriMenu();