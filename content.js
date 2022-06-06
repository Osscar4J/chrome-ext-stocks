function changeBg(){
	var e=document.createElement('style');
	e.innerText='*,*::before{background-color:#555 !important;color:#ddd;user-select:auto !important;}';
	document.head.appendChild(e);
}

function changeAutoSelect(){
	var e=document.createElement('style');
	e.innerText='html,body,div,p,span{user-select:auto !important;}';
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
let autoSelect = 'se';
let hupuRt = 'rt';
let prevChars = '';

let openRmE = 're'
let rmEState = false
let currEle = null
let prevEle = null

document.onkeydown = e => {
    prevChars += e.key
    if (prevChars.indexOf(changeBgChars) > -1){
        changeBg()
        prevChars = '';
    }

    if (prevChars.indexOf(openRmE) > -1){
        rmEState = !rmEState
        if (!rmEState){
            if (currEle){
                // currEle.style = ''
                prevEle.className = prevEle.className.replace(/\srmel-shadow/, '')
                currEle.onclick = null
                currEle = null
            }
            if (prevEle){
                // prevEle.style = ''
                prevEle.className = prevEle.className.replace(/\srmel-shadow/, '')
                prevEle = null
            }
        }
        prevChars = '';
    }

    if (prevChars.indexOf(picInPicChars) > -1){
        picInPic()
        prevChars = '';
    }
    if (prevChars.indexOf(autoSelect) > -1){
        changeAutoSelect()
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
    if (e.key.toLocaleLowerCase() == "escape"){
        window.speechSynthesis.cancel()
    }
}

let prevShadow = ''

// 移除页面元素
document.onmousemove = e => {
    if (rmEState){
        if (currEle != e.target){
            currEle = e.target
            // currEle.style.border = "1px dashed red !important"
            currEle.className += ' rmel-shadow'
            currEle.onclick = ev => {
                ev.preventDefault()
                ev.stopPropagation()
                currEle.parentElement.removeChild(currEle)
            }

            if (prevEle){
                prevEle.className = prevEle.className.replace(/\srmel-shadow/, '')
                prevEle.onclick = null
            }
            prevEle = currEle
        }
    }
}

let selectedTxt = ""

const popId = "pop-" + Math.floor(Math.random()*100000000)
const pop = document.createElement('div')
pop.style.background = '#ffffff';
pop.style.border = "1px solid #eee"
pop.style.padding = "5px"
pop.style.position = "absolute"
pop.style.display = "none"
pop.style.zIndex = 9999999999

const readBtn = document.createElement('button')
readBtn.innerText = "Read"
readBtn.id = popId
readBtn.onclick = e => {
    if (selectedTxt){
        let msg = new SpeechSynthesisUtterance(selectedTxt)
        window.speechSynthesis.speak(msg)
    }
}
pop.appendChild(readBtn)
document.body.appendChild(pop)

document.onmouseup = e => {
    let txt = window.getSelection().toString()
    let top = e.pageY + "px"
    let left = e.pageX + "px"

    if (txt){
        selectedTxt = txt
        if (popId != e.target.id){
            pop.style.top = top
            pop.style.left = left
            pop.style.display = "block"
        }
    } else if (pop.style.display == "block") {
        pop.style.display = "none"
        selectedTxt = ""
    }
}


// 注入默认样式
let e=document.createElement('style');
e.innerText='.rmel-shadow {box-shadow: 0 2px 10px 0 rgb(255 1 1 / 1) !important;}';
document.head.appendChild(e);