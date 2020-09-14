const tf = require('@tensorflow/tfjs-node');
const Jimp = require('jimp');
const url = require('url');

const labels = [
    'fall',
    'termite',
    'locust',
    'white'
];

const imgwidth = 200;
const imgheight = 200;
const imgchannel = 3;

const topixel = async function (imgpath) {
    const pixeldata = [];
    const img = await Jimp.read(imgpath);
    await img
        .resize(imgwidth, imgheight)
        .invert()
        .scan(0, 0, imgwidth, imgheight, (x, y, idx) => {
            let v = img.bitmap.data[idx + 0];
            pixeldata.push(v / 255);
        });
    return pixeldata;
}



const predicting = function (model, imgpath) {
    return topixel(imgpath).then(pixeldata => {
        const imgtensor = tf.tensor(pixeldata, [imgwidth, imgheight, imgchannel]);
        const inputensor = imgtensor.expandDims();
        const prediction = model.predict(inputensor);
        const scores = prediction.arraySync()[0];

        const maxscore = prediction.max().arraySync();
        const maxscoreindex = scores.indexOf(maxscore);

        const labelscore = {};

        scores.forEach((s, i) => {
            labelscore[labels[i]] = parseFloat(s.toFixed(4));

        });

        return {
            prediction: `${labels[maxscoreindex]} (${parseInt(maxscore * 100)}%)`,
            score: labelscore
        };
    });
};


const activate = async function () {
    if (process.argv.length < 3) {
        console.log('please pass image for processing. ex:');
        console.log(' node app.js /path/to/image.jpg');

    }
    else {
        const imgpath = process.argv[2];

        // const modelUrl = 'file:///C:/Users/user/Documents/Node/Classify/model.json';


        console.log('loading model......');
        const model = await tf.loadLayersModel('file:///../Classify/model.json');
        model.summary();


        console.log('running prediction .....');
        const prediction = await predicting(model, imgpath);
        console.log(prediction);


    }

};

activate();








