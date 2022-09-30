const carouselContainer = document.querySelector('.carousel-container');
const carouselList = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotList = document.querySelectorAll('.dot-item');

//Thêm 2 element clone vào đầu và cuối list
const firstCloneElement = carouselList[0].cloneNode(true);
const lastCloneElement = carouselList[carouselList.length - 1].cloneNode(true);

firstCloneElement.id = 'first-clone';
lastCloneElement.id = 'last-clone';

carouselContainer.prepend(lastCloneElement);
carouselContainer.append(firstCloneElement);

const newCarouselList = document.querySelectorAll('.carousel-item');

let index = 1;
const size = carouselList[0].clientWidth;

carouselContainer.style.transform = `translateX(-${size * index}px)`;

prevBtn.onclick = function () {
    // if (index <= 0) return;
    if (index > 0) {
        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
        carouselContainer.style.transform = `translateX(${-size * --index}px)`;
        checkDotAtive();
    }
};

nextBtn.onclick = function () {
    // if (index >= newCarouselList.length - 1) return;
    if (index < newCarouselList.length - 1) {
        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
        carouselContainer.style.transform = `translateX(${-size * ++index}px)`;
        checkDotAtive();
    }
};

carouselContainer.ontransitionend = function () {
    if (newCarouselList[index].id === 'last-clone') {
        carouselContainer.style.transition = 'none';
        index = newCarouselList.length - 2;
        carouselContainer.style.transform = `translateX(${-size * index}px)`;
        checkDotAtive();
    }

    if (newCarouselList[index].id === 'first-clone') {
        carouselContainer.style.transition = 'none';
        index = 1;
        carouselContainer.style.transform = `translateX(${-size * index}px)`;
        checkDotAtive();
    }
};

dotList.forEach((item, i) => {
    item.onclick = function () {
        index = i + 1;
        carouselContainer.style.transition = 'transform 0.5s ease-in-out';
        carouselContainer.style.transform = `translateX(${-size * index}px)`;
        checkDotAtive();
    };
});

function checkDotAtive() {
    dotList.forEach((item, i) => {
        if (i === index - 1) {
            const dotActive = document.querySelector('.dot-item.active');
            if (dotActive) {
                dotActive.classList.remove('active');
            }
            item.classList.add('active');
        }
    });
}

checkDotAtive();
