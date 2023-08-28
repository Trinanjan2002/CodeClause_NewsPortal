//ada74a59aab94606b6776846348ce2c9
//https://newsapi.org/v2/top-headlines?country=in&apiKey=ada74a59aab94606b6776846348ce2c9

let endpoint = "top-headlines";
let country = "in";
let apiKey = "ada74a59aab94606b6776846348ce2c9";

let url = `https://newsapi.org/v2/${endpoint}?country=${country}&apiKey=${apiKey}`;

populate(url);

async function getNews(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function populate(url) {
    let html = "";
    let data = await getNews(url);
    data.articles.forEach(news => {
        if (news.urlToImage != null && news.title != null && news.content != null) {
            let txt = news.content;
            if (txt.length > 150) {
                txt = txt.substring(0, 170) + "...<b>Read More</b>";
            } else {
                txt += "...<b>Read More</b>";
            }

            html += `<div class="card m-2" style="width: 18rem; min-height: 33rem;">
                    <img src="${news.urlToImage}"
                        class="card-img-top" alt="...">
                    <div class="card-body" style="background-color: rgb(216, 223, 230);">
                        <h5 class="card-title">${news.title}
                        </h5>
                        <p class="card-text" style="color: rgb(84, 85, 86);">${txt}</b></p>
                        <a href="${news.url}" class="btn btn-primary" target="_blank">Goto the Article</a>
                    </div>
                </div>`;
        }
    });
    document.getElementById("newsArea").innerHTML = html;
}