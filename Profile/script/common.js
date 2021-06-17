/* HEADER */
window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
window.onload = function () { scrollFunction() };
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var header = document.getElementById('header');

  if (document.documentElement.scrollTop > 70) {
    if (!header.classList.contains('navbar-fixed')) {
      header.classList.add('navbar-fixed');
      document.getElementsByTagName('body')[0].style.marginTop = '70px';
      header.style.display = 'none';
      setTimeout(function () {
        header.style.display = 'block';
      }, 40);
    }
  } else {
    if (header.classList.contains('navbar-fixed')) {
      header.classList.remove('navbar-fixed');
      document.getElementsByTagName('body')[0].style.marginTop = '0';
    }
  }
}

function menuToggle() {
  document.getElementById('menu').classList.toggle('show');
}

document.getElementById('toggleBtn').addEventListener('click', menuToggle);


/* WELCOME AREA */
var imageSlideIndex = 1; // 현재 노출되어야하는 이미지슬라이드의 번호 보관
showImageSlides(imageSlideIndex);

//자동 슬라이드를 위한 함수
function imageSlideTimer() {
  plusImageSlides(1);
}

//imageSlideTimer함수를 3초마다 호출
var imageTimer = setInterval(imageSlideTimer, 3000);

// showImageSlides를 호출 imageSlideIndex에 인자로 전달된 n값을 더해 전달
function plusImageSlides(n) {
  clearInterval(imageTimer);
  imageTimer = setInterval(imageSlideTimer, 3000);

  showImageSlides(imageSlideIndex += n);
}

// 인자로 전달된 n값으로 이미지슬라이드를 초기화해 보여줌
function currentImageSlide(n) {
  clearInterval(imageTimer);
  imageTimer = setInterval(imageSlideTimer, 3000);

  showImageSlides(imageSlideIndex = n);
}

// 인자값으로 전달된 n값을보고 적절한 슬라이드를 보여줌
// 슬라이드 방식: 모든 슬라이드 none처리(not active), 이미지슬라이스인덱스에 해당되는 것만 보여줌
function showImageSlides(n) {
  var i;
  var slides = document.getElementsByClassName('image-slide');
  var dots = document.getElementsByClassName('dot');
  if (n > slides.length) { imageSlideIndex = 1 }    // n값이 slideindex값보다 크다면 이미지 슬라이드 값 1로 초기화
  if (n < 1) { imageSlideIndex = slides.length } // n값이 1보다 작다면 4번째 슬라이드 인덱스가 보여짐

  // 모든 슬라이드 none 처리
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }

  //dot의 i번째 인덱스요소에 class name에 active라는 클래스가 있다면 공백으로 제거한 후에 다시 넣어줌
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(' active', '');
  }
  slides[imageSlideIndex - 1].style.display = 'block';  // imageSlide index에 해당하는 slide가 보여짐
  dots[imageSlideIndex - 1].className += ' active'; // active라는 클래스 추가(슬라이드에 맞는 dot)
}

// Click 이벤트(바로 인자를 넘겨버리면 함수가 여기서 실행되기때문에 bind로 null처리를 해주고 인자 넘겨줌)
document.getElementById('imagePrev').addEventListener('click', plusImageSlides.bind(null, -1));
document.getElementById('imageNext').addEventListener('click', plusImageSlides.bind(null, 1));
document.getElementById('firstDot').addEventListener('click', currentImageSlide.bind(null, 1));
document.getElementById('secondDot').addEventListener('click', currentImageSlide.bind(null, 2));
document.getElementById('thirdDot').addEventListener('click', currentImageSlide.bind(null, 3));
document.getElementById('forthDot').addEventListener('click', currentImageSlide.bind(null, 4));

// document.getElementById('imagePrev').addEventListener('click', function() {plusImageSlides(-1);});
// document.getElementById('imageNext').addEventListener('click', function() {plusImageSlides(1);});
// document.getElementById('firstDot').addEventListener('click', function() {currentImageSlide(1);});
// document.getElementById('secondDot').addEventListener('click', function() {currentImageSlide(2);});
// document.getElementById('thirdDot').addEventListener('click', function() {currentImageSlide(3);});
// document.getElementById('forthDot').addEventListener('click', function() {currentImageSlide(4);});


/* PORTFOLIO SECTION */

// list Item Click시 해당 list item active시켜줌
// list Item에 맞는 filter Item Portfolil item을 보여줌
filterSelection('all');

function filterSelection(id) {
  let x, i;

  x = document.getElementsByClassName('listItem');

  for (i = 0; i < x.length; i++) {
    removeClass(x[i], 'active'); // All list item Deactivation(비활성화)
  }
  addClass(document.getElementById(id), 'active'); // Selected id Activation(활성화)
  //=> 모든 list item이 다 비활성화 되었다가 
  //현재 선택된 id값에 해당되는 list item만 active 됨.

  x = document.getElementsByClassName('filterItem');
  if (id == 'all') id = ''; //뒤에서 indexOf함수 호출 시 id값에 공백을 넣게 되면 이 부분에서 0이 리턴이 됨.
  //전체인 경우에는 모든 객체에 대해서 show함수가 add되어야되기 때문에 all이라는 인자가 전달된 경우 id를 공백으로 초기화 
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], 'show');
    if (x[i].className.indexOf(id) > -1) //id가 존재하거나 공백이라면
      addClass(x[i], 'show'); //해당 객체에 show라는 class 넣어줌
  }
}

// filterSelection함수의 보조함수1
function addClass(element, name) {
  if (element.className.indexOf(name) == -1) {
    element.className += " " + name;
  }
}

// filterSelection함수의 보조함수2
function removeClass(element, name) {
  let arr;
  arr = element.className.split(" ");

  while (arr.indexOf(name) > -1) { //name class에 arr가 존재한다면
    arr.splice(arr.indexOf(name), 1); //arr에 splice함수 호출하여 indexOf name에 있는 한 개의 요소를 삭제
  }
  /* 배열의 원소들을 연결하여 하나의 값으로 만듭니다. */
  element.className = arr.join(" ");
  //join함수는 배열의 원소들을 연결하여 하나의 값으로 만드는 함수
  //하나의 값으로 만들때 각 요소 사이사이에 인자로 전달한 이 인자의 공백을 넣어 합쳐준다.
}

document.getElementById('all').addEventListener('click', filterSelection.bind(null, 'all'));
document.getElementById('uiux').addEventListener('click', filterSelection.bind(null, 'uiux'));
document.getElementById('java').addEventListener('click', filterSelection.bind(null, 'java'));
document.getElementById('db').addEventListener('click', filterSelection.bind(null, 'db'));

//  Modal - Portfolio

// viewPortfolio함수를 fillterItems변수에 대해서 모두 Click 이벤트로 연결해줌
function viewPortfolio(event) {
  let polyNode = event.target;
  //overlay div 태그와 i 태그가 event.target으로 2개가 잡히게되므로 보완해줌.
  //polynode를 소문자로 변환 후 i tag이면 polyNode에 parentNode 넣어줌
  if (polyNode.tagName.toLowerCase() == 'i') { polyNode = polyNode.parentNode; }

  let overlayNode = polyNode;
  let imageNode = overlayNode.nextElementSibling;
  let itemNode = overlayNode.parentNode;
  //image class태그 가져옴
  let mainNode = itemNode.nextElementSibling;
  let subNode = mainNode.nextElementSibling;
  let textNode = subNode.nextElementSibling;

  // Modal - Portfolio 구성
  document.getElementById('modalImage').src = imageNode.src;
  document.getElementById('modalMain').innerHTML = mainNode.innerHTML;
  document.getElementById('modalSub').innerHTML = subNode.innerHTML;
  document.getElementById('modalText').innerHTML = textNode.innerHTML;

  //Modal - Portfolio 나타냄
  document.getElementById('portfolioModal').style.display = 'block';
}

//Modal - Portfolio Close(닫기)
document.getElementById('modalClose').addEventListener('click', function () {
  document.getElementById('portfolioModal').style.display = 'none';
});

let filterItems = document.getElementsByClassName('overlay');

for (let i = 0; i < filterItems.length; i++) {
  filterItems[i].addEventListener('click', viewPortfolio);
} //모든 overlay객체에 대해서 click 이벤트 발생 시 viewPorfolio 함수가 호출됨


// NavBar2 SECTION