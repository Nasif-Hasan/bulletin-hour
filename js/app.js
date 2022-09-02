const loadAllNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = res.json();
    return data;
}

const catagoriMenu = async() => {
    // console.log(loadAllNews());
    const data = await loadAllNews();
    const newsData = data.data.news_category
    // console.log(newsData);

    const catagoryMenu = document.getElementById('catagory-menu') 

    for (const news of newsData){
        // console.log(news.category_name);
        const li = document.createElement('li');
        li.innerHTML = `
        <a class="px-8 text-lg">${news.category_name}</a>
        `
        catagoryMenu.appendChild(li)

    }
    
    // console.log(data.data.news_category)
}

catagoriMenu()