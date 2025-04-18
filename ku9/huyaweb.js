//ku9JS交流群424765458

function main(item) {
    let url = item.url;
    let id = ku9.getQuery(url, "id");
    //const jsonUrl = `改网站${id}/`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    };
//Mozilla/5.0 (Linux; Android 10; HMA-AL00 Build/HUAWEIHMA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/88.0.4324.93 Mobile Safari/537.36
    // 注入全屏播放的JS代码
    const jscode = `
(function(){
  const startTime = Date.now();
  
  // 强制全局样式（单行模式）
  document.documentElement.style.cssText = 'background:black!important;height:100vh!important;overflow:hidden!important;';
  document.body.style.cssText = 'visibility:hidden;margin:0!important;padding:0!important;min-height:100vh!important;';

  function getHyVideo() {
    const video = document.querySelector('#player-video video') || document.querySelector('video');
    const shadowHosts = document.querySelectorAll('[id^="player-"]');
    for(const host of shadowHosts) {
      if(host.shadowRoot) {
        const shadowVideo = host.shadowRoot.querySelector('video');
        if(shadowVideo) return shadowVideo;
      }
    }
    return video;
  }

  function removeHyElements() {
    ['#J_header','.player-sidebar','.left-panel','.login-layer','#player-control','.player-gift','.chat-box'].forEach(selector => {
      document.querySelectorAll(selector).forEach(e => e.remove());
    });
  }

  function setupHyPlayer(video) {
    const container = document.createElement('div');
    container.id = 'hy-fullscreen';
    container.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483647;background:#000;';

    const videoParent = video.parentElement;
    videoParent.style.cssText = 'position:static!important;width:100%!important;height:100%!important;';
    container.appendChild(videoParent);
    document.body.appendChild(container);

    video.style.cssText = 'object-fit:fill;';
    video.muted = false;
    video.volume = 1;
    
    const playAttempt = setInterval(() => {
      video.play().then(() => clearInterval(playAttempt)).catch(() => { video.muted = true; video.play(); });
    }, 500);
  }

  function checkHyPlayer() {
    if(Date.now()-startTime > 15000) {
      document.body.style.visibility = 'visible';
      return;
    }
    
    const video = getHyVideo();
    if(video && video.readyState > 0) {
      removeHyElements();
      setupHyPlayer(video);
      document.body.style.cssText = 'visibility:visible;';
      clearInterval(interval);
    }
  }
  
  const interval = setInterval(checkHyPlayer, 300);
})();

    `;

    return {
        webview: id,
        headers: headers,
        jscode: jscode
    };
}

//通过webview播放
//headres : 请求头，object；
//jscode : js代码，String（在页面加载完成后需要执行的js代码）；
//return { webview: url, jscode: jscode, headers: headers };
