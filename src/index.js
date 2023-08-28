import '../styles.css'

// 하나의 슬라이더에 보여줄 슬라이드 개수
const max_slide_count = 2
// 슬라이더, 슬라이드, 버튼 DOM요소 가져오기
const slider = document.body.getElementsByClassName('slide')[0]
const slides = document.body.getElementsByClassName('slide_item')
const nextButton = document.body.getElementsByClassName('next_button')[0]
let canClickSlide = true
// 슬라이드들의 위치값 재조정
const reconciled = () =>{
    // 슬라이더, 슬라이드 스타일 가져오기
    const sliderStyle = window.getComputedStyle(slider)
    const slidesStyle = []
    // 보여줄 슬라이드의 총 너비를 계산하여 슬라이더의 너비 적용
    let sliderWidth = 0
    for(let i=0; i<slides.length; i++){
        if (slides[i]){
            if (i<max_slide_count){
                sliderWidth += slides[i].clientWidth
            }
            slidesStyle.push(window.getComputedStyle(slides[i]))
        }
    }
    // 이전 슬라이드와 곂치지 않게 각 슬라이드의 위치값을 맞춰주기.
    for(let i=0; i<slides.length; i++){
        const prevSlideWidth = parseInt(slidesStyle[i].width.replace('px',''))
        slides[i].setAttribute('style',`left:${prevSlideWidth*(i-1)}px`)
    }
}




nextButton.addEventListener('click',function (){
    if (canClickSlide){
        // 마지막 아이템을 삭제 후 마지막 아이템 복사 후 처음에 넣기
        const lastItem = slides[slides.length-1]
        const prevLastItem = slides[slides.length-2]
        const newItem = prevLastItem.cloneNode(true)
        lastItem.remove()
        slides[0].before(newItem)
        canClickSlide = false
        // 이미지의 경우 로드 이벤트로 이미지 로딩이 끝났을때 DOM에 세팅해주기
        newItem.childNodes[0].addEventListener('load',function (){
            reconciled()
            canClickSlide = true
        })
    }

})

window.addEventListener('load',function (){
    // 마지막 아이템을 복사하여 가장 첫번쨰 아이템으로 넣기
    const lastItem = slides[slides.length-1]
    const newItem = lastItem.cloneNode(true)
    slides[0].before(newItem)
    reconciled()
})

