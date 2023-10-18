const watermarkUrl = 'LOgo.jpg'; 

let watermarkImage = new Image();

watermarkImage.crossOrigin = 'anonymous';
watermarkImage.src = watermarkUrl;

function addWatermark() {

    let imageUpload = document.getElementById('imageUpload');
    if (imageUpload.files.length > 0) {

        let reader = new FileReader();
        reader.onloadend = function() {

            let mainImage = new Image();
            mainImage.crossOrigin = 'anonymous';
            mainImage.src = reader.result;

            mainImage.onload = function() {
                let canvas = document.createElement('canvas');
                let ctx = canvas.getContext('2d');

                canvas.width = mainImage.width;
                canvas.height = mainImage.height;

                ctx.drawImage(mainImage, 0, 0);

                let watermarkWidth = mainImage.width / 4;
                let watermarkHeight = (watermarkWidth / watermarkImage.width) * watermarkImage.height;

                let watermarkPosX = mainImage.width - watermarkWidth;
                let watermarkPosY = mainImage.height - watermarkHeight;

                ctx.globalAlpha = 0.5;

                ctx.drawImage(watermarkImage, watermarkPosX, watermarkPosY, watermarkWidth, watermarkHeight);

                ctx.globalAlpha = 1.0;

                let dataUrl = canvas.toDataURL('image/jpeg');

                let resultImg = document.getElementById('result');
                resultImg.src = dataUrl;

                let downloadLink = document.createElement('a');
                downloadLink.href = dataUrl;
                downloadLink.download = 'image_with_watermark.jpg';

                downloadLink.click();
            };
        };
        reader.readAsDataURL(imageUpload.files[0]);
    } else {
        alert('Please upload an image.');
    }
}