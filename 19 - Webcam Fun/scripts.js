const video = document.querySelector(`.player`);
const canvas = document.querySelector(`.photo`);
const ctx = canvas.getContext(`2d`);
const strip = document.querySelector(`.strip`);
const snap = document.querySelector(`.snap`);

const applyEffect = ({
  pixels,
  r = c => c,
  g = c => c,
  b = c => c,
  a = c => c,
  rDiff = 0,
  gDiff = 1,
  bDiff = 2,
  aDiff = 3,
}) => {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + rDiff] = r(pixels.data[i + 0]); // red
    pixels.data[i + gDiff] = g(pixels.data[i + 1]); // green
    pixels.data[i + bDiff] = b(pixels.data[i + 2]); // blue
    pixels.data[i + aDiff] = a(pixels.data[i + 3]); // alpha
  }
  return pixels;
};

const redEffect = pixels =>
  applyEffect({
    pixels,
    r: c => c + 200,
    g: c => c - 50,
    b: c => c * 0.5,
  });

const rgbSplit = pixels =>
  applyEffect({
    pixels,
    rDiff: -350,
    gDiff: 200,
    bDiff: -550,
  });

const greenScreen = (pixels) => {
  const levels = {};
  document.querySelectorAll(`.rgb input`).forEach(i => levels[i.name] = i.value);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0]; // red
    const green = pixels.data[i + 1]; // green
    const blue = pixels.data[i + 2]; // blue
    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      pixels.data[i + 3] = 0; // alpha
    }
  }
  return pixels;
}

const paintToCanvas = () => {
  const { videoWidth: width, videoHeight: height } = video;
  canvas.width = width;
  canvas.height = height;
  return setInterval(() => {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let pixels = ctx.getImageData(0, 0, width, height);
    pixels = greenScreen(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 20);
}

const takePhoto = () => {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL(`image/jpeg`);
  const link = document.createElement(`a`);
  link.href = data;
  link.setAttribute(`download`, `image`);
  link.textContent = `Download Image`;
  link.innerHTML = `<img src=${data} alt='A Photo' />`;
  strip.insertBefore(link, strip.firstChild);
}

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices
      .getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.play();
  } catch (err) {
    console.error(`Couldn't access webcam!`);
  }
};

getVideo();
video.addEventListener(`canplay`, paintToCanvas);