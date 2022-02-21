const simplex = new SimplexNoise();

let dcgan;
let vector = [];
let images = [];
let imgCount = 0;
let xoff = 0;
let yoff = 0;

async function preload() {
    dcgan = await ml5.DCGAN('./manifest128.json', modelLoaded)
    console.log(dcgan);
}

function generate(v) {
    step();
    imgCount++;
    dcgan.generate(displayImage, v)
    // dcgan.generate(displayImage)
}

function setup() {

    createCanvas(128, 128)
    for (let i = 0; i < 128; i++) {
        vector[i] = simplex.noise2D(xoff, yoff)
        xoff += 0.1;
        yoff += 0.1;
    }
}

function step() {
    for (let i = 0; i < vector.length; i++) {
        vector[i] += map(simplex.noise2D(xoff, yoff), -1, 1, -0.4, 0.4)
    }
}

function displayImage(err, result) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(result, vector);
    images.push(result.image)
    result.image.save("img" + imgCount, 'jpg');
    image(result.image, 0, 0, 128, 128);
    if (imgCount < 300) {
        generate(vector)
    } else {
        console.log('finished!');
        document.getElementById("done").style.display = "block"
    }
}

function draw() {
    xoff += 0.1;
    yoff += 0.1;
}

function modelLoaded() {
    generate(vector);
    console.log('starting...');
}

function getImages() {
    console.log("images");
}