function changeBg(){
	var e=document.createElement('style');
	e.innerText='*,*::before{background-color:#555 !important;color:#ddd;}';
	document.head.appendChild(e);
}

function picInPic() {
    let video = document.getElementsByTagName('video')[0];
    if (video){
        video.requestPictureInPicture()
    }
}

let changeBgChars = 'cb';
let picInPicChars = 'vv';
let hupuRt = 'rt';
let prevChars = '';

document.onkeydown = e => {
    prevChars += e.key
    if (prevChars.indexOf(changeBgChars) > -1){
        changeBg()
        prevChars = '';
    }
    if (prevChars.indexOf(picInPicChars) > -1){
        picInPic()
        prevChars = '';
    }
    if (prevChars.indexOf(hupuRt) > -1){
        var a = document.querySelector('.post-fix-title-content-wrapper');
        a&&a.remove();
        a=document.querySelector('.bbs-index-web-right');
        a&&a.remove();
        a=document.querySelector('.bbs-index-web-nav');
        a&&a.remove();
        a=document.getElementsByTagName('aside');
        a&&a[0]&&a[0].remove();
        prevChars = '';
    }
}