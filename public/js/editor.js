// import { db } from "./firebase.js";

const sketchTitleField = document.querySelector('.title');
const sketchArticleField = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = sketchArticleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    sketchArticleField.value = sketchArticleField.value.slice(0, curPos) + textToInsert + sketchArticleField.value.slice(curPos);
}

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

publishBtn.addEventListener('click', () => {
    if(sketchArticleField.value.length && sketchTitleField.value.length){
        // generating id
        let letters = 'abcdefghijklmnopqrstuvwxyz';
        let sketchTitle = sketchTitleField.value.split(" ").join("-");
        let id = '';
        for(let i = 0; i < 4; i++){
            id += letters[Math.floor(Math.random() * letters.length)];
        }

        // setting up docName
        let docName = `${sketchTitle}-${id}`;
        let date = new Date(); // for published at info

        // access firestore with db variable
        db.collection("blogs").doc(docName).set({
            title: sketchTitleField.value,
            article: sketchArticleField.value,
            bannerImage: bannerPath,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        })
        .then(() => {
            console.log('date entered');
            // location.href = `/${docName}`;
        })
        .catch((err) => {
            console.error(err);
        })
        // db.collection("sketches").doc(docName).set({
        //     title: sketchTitleField.value,
        //     article: sketchArticleField.value,
        //     bannerImage: bannerPath,
        //     publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        // })
        // .then(() => {
        //     console.log('date entered');
        // })
        // .catch((err) => {
        //     console.error(err);
        // })
    }
})