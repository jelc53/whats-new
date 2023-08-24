let sketchId = decodeURI(location.pathname.split("/").pop());

let docRef = db.collection("blogs").doc(sketchId);

// fetch document from firestore
docRef.get().then((doc) => {
  if(doc.exists){
    //console.log(doc.data());
    setupSketch(doc.data());
  } else{
    location.replace("/");
  }
})

const setupSketch = (data) => {
  const banner = document.querySelector('.banner');
  const sketchTitle = document.querySelector('.title');
  const titleTag = document.querySelector('.title');
  const publish = document.querySelector('.published');

  banner.style.backgroundImage = `url(${data.bannerImage})`;
  titleTag.innerHTML += sketchTitle.innerHTML = data.title;
  publish.innerHTML += data.publishedAt;
  
  const article = document.querySelector('.article');
  addArticle(article, data.article);
}

const addArticle = (ele, data) => {
  //console.log(data);
  data = data.split("\n").filter(item => item.length);
  data.forEach(item => {
    // check for heading
    if(item[0] == '#') {
      let hCount = 0;
      let i = 0;
      while(item[i] == '#'){
        hCount++;
        i++;
      }
      let tag = `h${hCount}`;
      ele.innerHTML += `<${tag}>${item.slice(hCount, item.length)}</${tag}>`
    } 
    //check for image format
    else if(item[0] == "!" && item[1] == "["){
      let seperator;

      for(let i = 0; i <= item.length; i++){
        if(item[i] == "]" && item[i + 1] == "(" && item[item.length - 1] == ")"){
          seperator = i;
        }
      }  
      let alt = item.slice(2, seperator);
      let src = item.slice(seperator + 2, item.length - 1);
      ele.innerHTML += `
        <img src="${src}" alt="${alt}" class="article-image">
      `
    }
    
    else{
      ele.innerHTML += `<p>${item}</p>`;
    }
  })
}

