function main(item) {
    const id = ku9.getQuery( item.url,  "id" );
    const type = ku9.getQuery( item.url,  "type" ) || 'flv';
    const ym = 'tc-tc2-interact.douyucdn2.cn';
    let wasu;

    if (id.length > 14) {
        wasu = `https://${ym}/live/${id}.${type}`;
    } else {
        const url = 'https://wxapp.douyucdn.cn/Livenc/Getplayer/newRoomPlayer';
        const postData = `room_id=${id}&token=wxapp&rate=&did=10000000000000000000000000001501&big_ct=cpn-androidmpro&is_Mix=false`;

        const headers = { 'User-Agent': 'Mozilla/5.0' };

        let res = ku9.post(url, JSON.stringify(headers), postData );
        const json = JSON.parse(res);
        wasu = json.data.hls_url;

        if (type !== 'flv') {
            const idn = wasu.split('/').pop().split('_')[0];
            wasu = `https://${ym}/live/${idn}.${type}`;
        }
    }
 if (wasu) {
    return JSON.stringify({ url: wasu });
  } else {
        throw new Error("\n提示：\n 直播已结束！\n 直播间还未开门呢\n");
    }
}