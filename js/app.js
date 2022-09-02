const loadAllNews = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = res.json();
    return data;
}

const catagoriMenu = async() => {
    // console.log(loadAllNews());
    const data = await loadAllNews()
    console.log(data.data.news_category)
}

catagoriMenu()