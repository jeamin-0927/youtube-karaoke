const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const menter = {
  0: [
    '혹시... 성대가 없는건 아니..죠?'
  ], 10: [], 20: [], 30: [], 40: [],
  50: [
    '50점... 이 정도면 잘한거 아닌가요?'
  ],
  60: [
    '호오.. 그래도 중간은 넘었어!'
  ],
  70: [
    '70점.......... 내가 70점이라니!!'
  ],
  80: [
    '아쉬워요... 80점이라니...'
  ],
  90: [
    '조오끔만 더 잘 했으면 백 점인데,, 아쉽네요!'
  ],
  100: [
    '가수 왜 안하시는지 의문인데..?'
  ]
}

const score = () => {
  const scores = rand(0, 10) == 0 ? 0 : rand(0, 50) + 50;
  const tener = scores - (scores % 10);
  const mets = menter[tener][rand(0, menter[tener].length - 1)];
  document.querySelector('body').innerHTML = `
    <div class="score-div">
      <div class="score-display">
        <div class="score-title">SCORE</div>
        <div class="score-score">0</div>
      </div>
      <div class="score-ment"></div>
    </div>
  `;
  const scoreDisplay = document.querySelector('.score-score');
  let scorering = 0;
  const scoreInterval = setInterval(() => {
    scoreDisplay.innerHTML = scorering;
    scorering++;
    if(scorering > scores) {
      clearInterval(scoreInterval);
      document.querySelector('.score-ment').innerHTML = mets;
    }
  }, 10);

  setTimeout(() => {
    window.close();
  }, 15000);
}

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
    score();
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