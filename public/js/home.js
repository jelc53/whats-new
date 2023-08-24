const sketchSection = document.querySelector('.sketch-section');

db.collection("blogs").get().then((blogs) => {
    blogs.forEach(sketch => {
        if(sketch.id != decodeURI(location.pathname.split("/").pop())){
            createSketch(sketch);
        }
    })
})

const createSketch = (sketch) => {
    let data = sketch.data();
    sketchSection.innerHTML += `
    <div class="sketch-card">
        <img src="${data.bannerImage}" class="sketch-image" alt="">
        <h1 class="sketch-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="sketch-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${sketch.id}" class="btn dark">read</a>
    </div>
    `;
}
