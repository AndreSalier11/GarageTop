export default function imageLoader(data, idx) {
    let imgList = [];
    let imgLink = data[idx].Img.split('/');

    for(let i = 0; i < 150; i++) {
        imgLink[4] = 'f'+ i;
        imgList.push(imgLink.join('/'));
    }

    return imgList;
}