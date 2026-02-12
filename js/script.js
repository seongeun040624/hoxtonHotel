import { europe, ukIreland, usa, all } from "./data.js";

$(function(){
    //headBanner
    let texts = $('.headBanner .textGroup');
    let index = 0;

    texts.eq(index).show();

    setInterval(function () {
        texts.eq(index).fadeOut(300, function () {
            index = (index + 1) % texts.length;
            texts.eq(index).fadeIn(300);
        });
    }, 3000);

    //language
    let a = true;

    $('.language').on('click',function(){
        if(a){
            $(this).find('ul').show();
            a= false;
        }else{
            $(this).find('ul').hide();
            a= true;
        }
    });

    //nav
    $('#nav>ul>li').hover(function(){
        $(this).find('a').css('color', '#000');
        //형제 요소들 같이 색 바뀌기
        $(this).siblings().find('a').css('color', '#999');
        $('.languageList a').css('color', '#555')

    }, function(){
        $(this).find('a').css('color', '#555');
        $(this).siblings().find('a').css('color', '#555');
    });

    //select location
    $('.location').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.locationWrap').removeClass('active');
        } else {
            $(this).addClass('active');
            $('.locationWrap').addClass('active');
        }
    });

    //locationWrap
    $('.locationList > ul > li').hover(function () {
        const index = $(this).index() + 1;
        $('.locationDetail').removeClass('active');
        $('.locationDetail' + index).addClass('active');
    }, function () {
        $('.locationDetail').removeClass('active');
    });


    //locationListImg
    $('.locationDetail1 > ul > li').hover(function () {
            let idx = $(this).index();

            $('.locationImg1 img').removeClass('active');
            $('.locationImg1 img').eq(idx).addClass('active');
        },function () {
            $('.locationImg1 img').removeClass('active');
    });

    $('.locationDetail2 > ul > li').hover(function () {
            let idx = $(this).index();

            $('.locationImg2 img').removeClass('active');
            $('.locationImg2 img').eq(idx).addClass('active');
        },function () {
            $('.locationImg2 img').removeClass('active');
    });

    $('.locationDetail3 > ul > li').hover(function () {
            let idx = $(this).index();

            $('.locationImg3 img').removeClass('active');
            $('.locationImg3 img').eq(idx).addClass('active');
        },function () {
            $('.locationImg3 img').removeClass('active');
    });

    $('.locationDetail4 > ul > li').hover(function () {
            let idx = $(this).index();

            $('.locationImg4 img').removeClass('active');
            $('.locationImg4 img').eq(idx).addClass('active');
        }, function () {
            $('.locationImg4 img').removeClass('active');
    });

    $('.taste').hover(function () {
            $('.locationImg5 img').addClass('active');
        }, function () {
            $('.locationImg5 img').removeClass('active');
    });

    $('.allHotel').hover(function () {
            $('.locationImg6 img').addClass('active');
        }, function () {
            $('.locationImg6 img').removeClass('active');
    });


    //calenders
    flatpickr("#checkDate", {
        mode: "range",
        locale: "en",
        dateFormat: "Y-m-d"
    });
    flatpickr("#resCheckDate", {
        locale: "en",
        dateFormat: "Y-m-d"
    });
    flatpickr("#reservDate", {
        mode: "range",
        locale: "en",
        dateFormat: "Y-m-d"
    });



    //rooms adult/child
    const MAX_PER_ROOM = 4;

   //방당 인원 제한 로직
    function updateRoomLimit($guest) {
        const $adult = $guest.find('.adults input');
        const $child = $guest.find('.child input');

        const adult = Number($adult.val());
        const child = Number($child.val());

        const childMax = MAX_PER_ROOM - adult;

        // child max 동적 제한
        $child.attr('max', childMax);

        if (child > childMax) {
            $child.val(childMax);
        }

        // adult 버튼
        $guest.find('.adults .minus').prop('disabled', adult <= 1);
        $guest.find('.adults .plus').prop('disabled', adult >= MAX_PER_ROOM);

        // child 버튼
        $guest.find('.child .minus').prop('disabled', child <= 0);
        $guest.find('.child .plus').prop('disabled', child >= childMax);
    }

    /* ===============================
    stepper 이벤트 (위임 방식)
    → 초기 화면 + 동적 생성 모두 대응
    =============================== */
    $(document).on('click', '.stepper button', function () {
        const $btn = $(this);
        const $input = $btn.siblings('input');
        const $guest = $btn.closest('.guest');

        let value = Number($input.val());
        const min = Number($input.attr('min'));
        const max = Number($input.attr('max'));

        if ($btn.hasClass('plus') && value < max) value++;
        if ($btn.hasClass('minus') && value > min) value--;

        $input.val(value);

        updateRoomLimit($guest);
    });

    /* ===============================
    초기 로드 시 ROOM1 보정
    =============================== */
    $('.guest').each(function () {
        updateRoomLimit($(this));
    });

    /* ===============================
    guest HTML 생성
    =============================== */
    function createGuest(index) {
        return `
            <div class="guest">
                <span>ROOM${index}</span>

                <div class="adults">
                    <span>Adults</span>
                    <div class="stepper">
                        <button type="button" class="minus">-</button>
                        <input type="number" min="1" value="1" max="4" readonly />
                        <button type="button" class="plus">+</button>
                    </div>
                </div>

                <div class="child">
                    <span>Children</span>
                    <div class="stepper">
                        <button type="button" class="minus">-</button>
                        <input type="number" min="0" value="0" max="3" readonly />
                        <button type="button" class="plus">+</button>
                    </div>
                </div>
            </div>
        `;
    }

    //방 개수 변경
    $('#roomSelect').on('change', function () {
        const roomCount = Number($(this).val());

        $('.guest').remove();

        for (let i = 1; i <= roomCount; i++) {
            const $guest = $(createGuest(i));
            $('.roomNum').after($guest);
            updateRoomLimit($guest);
        }
    });


    //roomWrap open/Close
    $('.room').click(function(e){
        e.preventDefault();
        $('.roomWrap').css('display', 'flex');
        // block이 아닌 flex로 강제 지정
    });
    $('.bookingClose').click(function(){
        $('.roomWrap').hide();
    });
    $('.bookingCLosepannel').click(function(){
        $('.roomWrap').hide();
    });

    //let mRo = true;
    $('.moRoom').click(function(e){
       $('.roomWrap').css('display', 'flex');
    });
    $('.moRoom').click(function(e){
       $('.roomWrap').css('display', 'none');
    });


    //tabContents
    $('.tabContents > div').hide();
    $('.tabContents > div').eq(0).show();

    $('.bookingTabs li').on('click', function (e) {
        e.preventDefault();

        const index = $(this).index();

        // 탭 active 처리
        $('.bookingTabs li').removeClass('roomActive');
        $(this).addClass('roomActive');

        // 콘텐츠 active 처리
        $('.tabContents > div').removeClass('roomActive').hide();
        $('.tabContents > div').eq(index).addClass('roomActive').show();
    });


    



    //mobile header

    //headBanner
    /* let mtexts = $('.mobileHeadBanner .textGroup');
    let mindex = 0;

    mtexts.eq(mindex).show();

    setInterval(function () {
        mtexts.eq(mindex).fadeOut(300, function () {
            mindex = (mindex + 1) % mtexts.length;
            mtexts.eq(mindex).fadeIn(300);
        });
    }, 3000);

    $('.moNavMenuBar').click(function() {
        // 클릭한 것만 토글하고 싶을 때 (현재 코드)
        $(this).toggleClass('active');
    });


    //mobile location
    let m = true;
    $('.moLocation > ul>li').click(function(){
        if(m ==true ){
            $(this).find('>ul').show()
            m = false;
        }else{
            $(this).find('>ul').hide()
            m = true;
        }
    });

    //mobilemenu자체
    let mo = true;
    $('.moNavMenuBar').click(function(){
        if( mo == true){
            $('.mobileMenu').css('opacity', 1);
            mo = false;
        }else{
            $('.mobileMenu').css('opacity', 0);
            mo = true;
        }
    });

    let moRoomOpen = true;
    $(document).on('click', '.moRoom', function(e) {
        e.preventDefault();

        if (moRoomOpen == true) {
            // 예약창 열기
            $('#header .roomWrap').css({
                'display': 'flex',
                'position': 'fixed',
                'z-index': '10001'
            }).hide().fadeIn(300);
            
            moRoomOpen = false;
        } else {
            // 예약창 닫기
            $('#header .roomWrap').fadeOut(300);
            
            moRoomOpen = true;
        }
    }); */


    // 1. 모바일 상단 배너 텍스트 슬라이드

    let mtexts = $('.mobileHeadBanner .textGroup');
    let mindex = 0;

    mtexts.eq(mindex).show();

    setInterval(function () {
        mtexts.eq(mindex).fadeOut(300, function () {
            mindex = (mindex + 1) % mtexts.length;
            mtexts.eq(mindex).fadeIn(300);
        });
    }, 3000);


    // ================================
    // 2. 햄버거 버튼 + 모바일 메뉴 제어
    // ================================

    $('.moNavMenuBar').on('click', function(e) {
        e.preventDefault();

    const $menu = $('.mobileMenu');
    const $btn = $(this);

    if ($menu.is(':visible')) {

        // 🔹 메뉴 닫기
        $menu.fadeOut(200);

        $btn.removeClass('active');   // X → 햄버거 복귀

        $('html, body').css({
            overflow: '',
            height: ''
        });

    } else {

        // 🔹 메뉴 열기
        $menu.fadeIn(200);

        $btn.addClass('active');      // 햄버거 → X 변환

        $('html, body').css({
            overflow: 'hidden',
            height: '100vh'
        });
    }

});



    // ================================
    // 3. 모바일 Location 아코디언
    // ================================

    $('.moLocation > ul > li').click(function(e){

        e.stopPropagation();

        $(this).children('ul').slideToggle(200);
    });


    // ================================
    // 4. 모바일 Room 버튼
    // ================================

    let moRoomOpen = true;

    $(document).on('click', '.moRoom', function(e) {

        e.preventDefault();

        if (moRoomOpen == true) {

            $('#header .roomWrap').css({
                'display': 'flex',
                'position': 'fixed',
                'z-index': '10001'
            }).hide().fadeIn(300);

            moRoomOpen = false;

        } else {

            $('#header .roomWrap').fadeOut(300);
            moRoomOpen = true;
        }

    });







    

    
    //content1

    // 1️⃣ reservLoc
    $('.reservLoc').on('click', function (e) {

        e.stopPropagation(); // 부모로 이벤트 전파 방지

        const $this = $(this);
        const $ul = $this.find('ul');

        const windowHeight = $(window).height();
        const elementTop = $this.offset().top;
        const scrollTop = $(window).scrollTop();

        const visibleTop = elementTop - scrollTop;
        const middlePoint = windowHeight / 2;

        // 화면 위치에 따라 드롭 방향 변경
        if (visibleTop < middlePoint) {
            // 화면 상단 영역 → 아래로 펼침
            $ul.css({
                top: '50px',
                bottom: 'auto'
            });
        } else {
            // 화면 하단 영역 → 위로 펼침
            $ul.css({
                bottom: '70px',
                top: 'auto'
            });
        }

        // 다른 열려있는 ul 닫기
        $('.reservLoc ul').not($ul).hide();

        // 현재 ul 토글
        $ul.stop().slideToggle(200);
    });

    // 2️⃣ 항목 선택 시 텍스트 반영
    $('.reservLoc ul li').on('click', function (e) {

        e.stopPropagation(); // 부모 클릭 방지

        var selectedText = $(this).text();

        $(this)
            .closest('.reservLoc')
            .find('.selected-label')
            .text(selectedText)
            .css('color', '#333');

        // 선택 후 닫기
        $(this).closest('ul').slideUp(200);
    });

    // 3️⃣ 외부 클릭 시 닫기
    $(document).on('click', function () {
        $('.reservLoc ul').slideUp(200);
    });


    //guest 선택 박스
    $('.rsvGuest').on('click', function(){
        $('.roomWrap').show();
    })






    //content3
    // swiper-wrapper 선택
    const swiperWrapper = document.getElementById("locationSwiperWrapper");

    const navigationOption = {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    };

    const usaSwiperOptions = {
        loop: false,
        centeredSlides: false,
        slidesPerView: 4,
        spaceBetween:20,
        navigation: navigationOption,
        allowTouchMove: true
    };

    const normalSwiperOptions = {
        loop: true,
        centeredSlides: false,
        slidesPerView: 5,
        spaceBetween: 10,
        navigation: navigationOption,
        breakpoints: {
            0: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 }
        }
    };

    let swiper2 = null;

    function normalizeUsaData(data) {
        const minSlides = 6;
        const result = [...data];

        while (result.length < minSlides) {
            result.push(...data);
        }

        return result;
    }

    function renderSlides(data, type = "normal") {

        const swiperElement = document.querySelector(".location-swiper"); //추가
        if (swiper2) {
            swiper2.destroy(true, true);
            swiper2 = null;
        }

        swiperWrapper.innerHTML = "";

        let renderData = data;

        if (type === "usa") {
           /*  renderData = normalizeUsaData(data); */
            swiperElement.classList.add("usa-mode");
        } else {
            swiperElement.classList.remove("usa-mode");
        }

        renderData.forEach(item => {
            const slide = document.createElement("div");
            slide.className = "swiper-slide";

            slide.innerHTML = `
                <article class="card">
                    <img src="${item.image}" alt="${item.title}">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </article>
            `;

            swiperWrapper.appendChild(slide);
        });

        swiper2 = new Swiper(
            ".location-swiper",
            type === "usa" ? usaSwiperOptions : normalSwiperOptions
        );
    }

    // 초기 로드
    renderSlides(europe, "normal");

    // 탭 버튼
    const buttons = document.querySelectorAll(".BtnWraps button");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("galTabAct"));
            btn.classList.add("galTabAct");

            const tab = btn.dataset.tab;

            if (tab === "europe") renderSlides(europe, "normal");
            if (tab === "ukIreland") renderSlides(ukIreland, "normal");
            if (tab === "all") renderSlides(all, "normal");
            if (tab === "usa") renderSlides(usa, "usa");
        });
    });




    //content4
    var swiper = new Swiper(".mySwiper", {
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    var swiper1 = new Swiper(".mySwiper1", {
        loop: true,
        pagination: {
            el: ".swiper-pagination1",
            type: "fraction",
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });




    //footer
    let f = true;

    $('.footLangEn').on('click',function(){
        if(f){
            $('.footlanguageList').show();
            f= false;
        }else{
            $('.footlanguageList').hide();
            f= true;
        }
    });
});