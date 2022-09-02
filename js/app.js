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

const someNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = res.json();
    diaplayNews(data);
}

const diaplayNews = async (newsCard) => {
    
    const newsDisplay = await newsCard
    console.log(newsDisplay);

    const showNews = document.getElementById('show-news')
    newsCard.forEach(cardNews => {
        const newsDiv = document.createElement('div')
        newsDiv.innerHTML = `
        <figure class="p-5">
            <img src="${cardNews.image_url}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        showNews.appendChild(newsDiv)
    })

}

catagoriMenu()