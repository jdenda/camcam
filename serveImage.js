var meta = require('./readImage');
var height = require('./resizeImageHeight');
var width = require('./resizeImageWidth');
var crop = require('./cropImage');
var comp = require('./compositeImages');
var fs = require('fs');

let baseData; 
const output = './images/image.jpg';


function generateImage(path, int, offset){
    console.log("generating picture based off "+path)
    const pre = './tmp/image'+(int-1);
    if(!pre===0){
        try {
            fs.unlinkSync(pre+"-resized-height.jpg")
            fs.unlinkSync(pre+"-resized-width.jpg")
            fs.unlinkSync(pre+"-resized-width-cropped.jpg")
        } catch(err) {
            console.error(err)
        }
    }
    const tmp = './tmp/image'+int;
    meta.getMetadata(path).then(x => {
        baseData = x; 
        height.resizeImageHeight(path, tmp+"-resized-height.jpg", offset)
        width.resizeImageWidth(path, tmp+"-resized-width.jpg").then(x =>{
            meta.getMetadata(tmp+"-resized-width.jpg").then(x => {
                crop.cropImage(tmp+"-resized-width.jpg", tmp+"-resized-width-cropped.jpg", Math.round(x.height / 2 -520)).then(x => {
                    meta.getMetadata(tmp+"-resized-height.jpg").then(y => {
                        let widthData = y;
                        comp.compositeImages(tmp+"-resized-width-cropped.jpg", tmp+"-resized-height.jpg", Math.round(960 - widthData.width / 2), output, parseInt(offset, 10)).then(x =>{
                        }).catch(console.error)
                    }).catch(console.error)
                }).catch(console.error)
            }).catch(console.error)     
        }).catch(console.error)
    }).catch(error => {
        console.error(error);
    })
}

module.exports.generateImage = generateImage;