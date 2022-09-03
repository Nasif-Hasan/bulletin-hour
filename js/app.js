const loadAllNews = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = res.json();
    return data;
    // console.log(data);
}

const catagoriMenu = async () => {
    // console.log(loadAllNews());
    const data = await loadAllNews();
    const newsData = data.data.news_category
    // console.log(newsData);

    const catagoryMenu = document.getElementById('catagory-menu')

    for (const news of newsData) {
        // console.log(news.category_name);
        const li = document.createElement('li');
        li.innerHTML = `
        <a onclick="someNews('${news.category_id}')" class="px-8 text-lg">${news.category_name}</a>
        `
        catagoryMenu.appendChild(li);
    }
    // console.log(data.data.news_category)
}

const someNews =  (category_id) => {
    // Start Loader
    const spinner = document.getElementById('spinner')
    spinner.classList.remove('hidden')

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res =>res.json())
    .then(data => diaplayNews(data.data))
    
}

const diaplayNews = (newsCard) => {
    
    // const newsDisplay = await newsCard
    console.log(newsCard);
    const showNews = document.getElementById('show-news')
    const notFound = document.getElementById('not-found')
    // newsDiv.textContent = '';
    notFound.textContent = '';

    if(newsCard.length === 0) {
        // console.log('Not Found');
        notFound.innerHTML = `
        <h2 class="text-4xl text-teal-500 text-center">Not Found</h2>
        `
        return
    }
    newsCard.forEach(cardNews => {
        // console.log(cardNews);
        const newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
        <figure class="p-5">
             <img src="${cardNews.thumbnail_url}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${cardNews.title}</h2>            
            <p>${cardNews.details.slice(0, 120) + '...'}</p>
            <div class="card-actions">
            <img style="height: 50px; width: 50px;" src="${cardNews.author.img}" alt="Shoes" class="rounded-xl" />
            <p>${cardNews.author.name ? cardNews.author.name : 'Name not found'}</p>
            <p><i class="fa-solid fa-eye"></i> ${cardNews.total_view ? cardNews.total_view : 00}</p>
                <label onclick="modalView('${cardNews._id}')" for="my-modal-3" class="btn btn-primary modal-button"><i class="fa-solid fa-arrow-right-long"></i></label>
            </div>
        </div>
        `
        showNews.appendChild(newsDiv)
    })  
    
    // Stop Loader
    spinner.classList.add('hidden')


}

const modalView = news_id =>{
    // console.log(newNews);
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => topNews(data.data[0]))
}

const topNews = hotNews => {
    console.log(hotNews);
    const modalNews = document.getElementById('modal-news')
    // modalNews.classList.add('modal')
    modalNews.innerHTML = `
    <div class="modal-box relative">
        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <img src="${hotNews.thumbnail_url}" alt="Shoes" class="rounded-xl"/>
        <h3 class="text-lg font-bold">${hotNews.title}</h3>
        <p class="py-4">${hotNews.details.slice(0, 250) + '...'}</p>
    </div>
    `
}

catagoriMenu()