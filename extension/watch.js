const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const watch = () => {
  document.querySelector('html').style.overflow = 'hidden';
  document.querySelector('body').style.overflow = 'hidden';
  document.querySelector('#columns').style.overflow = 'hidden';
  
  document.querySelector('#masthead-container').style.display = 'none';
  document.querySelector('#secondary-inner').style.display = 'none';
  document.querySelector('#comments').style.display = 'none';
  document.querySelector('#above-the-fold').style.display = 'none';
  document.querySelector("#movie_player > div.ytp-gradient-bottom").style.display = 'none';
  document.querySelector("#movie_player > div.ytp-chrome-bottom").style.display = 'none';
  
  document.querySelector("#movie_player > div.ytp-cued-thumbnail-overlay").click();

  // document.querySelector("#movie_player > div.ytp-cued-thumbnail-overlay").style.display = 'none';
  
  const seletcer = ["#movie_player > div.html5-video-container > video", "#movie_player"];
  for(let i in seletcer) {
    const select = document.querySelector(seletcer[i]);
    select.style.width = '100vw';
    select.style.height = '100vh';
    select.style.margin = '0';
    select.style.overflow = 'hidden';
    select.style.position = 'fixed';
    select.style.top = '0';
    select.style.left = '0';
  }
  document.querySelector('#movie_player > div.html5-video-container > video').classList.add('watcher');
  document.querySelector('#movie_player > div.html5-video-container > video').style.objectFit = 'contain';


  try{
    document.querySelector("#movie_player > div.ytp-player-content.ytp-iv-player-content > div.annotation.annotation-type-custom.iv-branding").style.display = 'none';
  } catch {}
};
const timeCheck = () => {
  const endTime = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-duration").innerText;
  const nowTime = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > div.ytp-time-display.notranslate > span:nth-child(2) > span.ytp-time-current").innerHTML;
  
  const endTimeArr = endTime.split(':');
  const nowTimeArr = nowTime.split(':');

  const endTimeSec = parseInt(endTimeArr[0]) * 60 + parseInt(endTimeArr[1]);
  const nowTimeSec = parseInt(nowTimeArr[0]) * 60 + parseInt(nowTimeArr[1]);

  if(endTimeSec - nowTimeSec < 1) {
    window.close();
  }
}
const timeChecker = () => {
  try{
    timeCheck();
  }
  catch{}
}

const watcher = () => {
  try{
    watch();
  }
  catch{}
}
window.onload = () => {
  watcher();
  timeChecker();
  setInterval(watcher, 10);
  setInterval(timeChecker, 100);
};

document.addEventListener('keydown', (e) => {
  if(e.key == 'Escape') {
    window.close();
  }
})