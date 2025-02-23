document.addEventListener("DOMContentLoaded", function () {
  // انتخاب المنت‌های اصلی
  const menuTrigger = document.querySelector(".bars3");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".mobile-menu-overlay");
  const closeButton = document.querySelector(".close-menu");

  // باز کردن منوی موبایل
  menuTrigger?.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-96");
    overlay.classList.remove("hidden");
  });

  // بستن منوی موبایل
  const closeMenu = () => {
    mobileMenu.classList.add("translate-x-96");
    overlay.classList.add("hidden");
  };

  closeButton?.addEventListener("click", closeMenu);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) closeMenu();
  });

  // مدیریت منوهای اصلی (تور و ویزا)
  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const trigger = item.querySelector(".menu-trigger");
    const submenu = item.querySelector(".submenu");
    const chevron = trigger.querySelector(".chevron");
  
    trigger?.addEventListener("click", () => {
      // بستن سایر منوها
      menuItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherSubmenu = otherItem.querySelector(".submenu");
          otherSubmenu.style.maxHeight = "0"; // بستن سایر منوها
          otherSubmenu.style.opacity = "0";
          otherItem.querySelector(".chevron")?.classList.remove("rotate-180");
        }
      });
  
      // بررسی تعداد زیرمنوها
      const submenus = item.querySelectorAll(".submenu"); // پیدا کردن همه زیرمنوها در این منو
      submenus.forEach((submenu) => {
        if (submenu.style.maxHeight === "0px" || !submenu.style.maxHeight) {
          // باز کردن زیرمنو
          submenu.style.maxHeight = `${submenu.scrollHeight}px`; // تنظیم ارتفاع داینامیک
          submenu.style.opacity = "1";
          submenu.classList.add("transition-all", "duration-300");
          chevron.classList.add("rotate-180");
        } else {
          // بستن زیرمنو
          submenu.style.maxHeight = "0"; // بستن زیرمنو
          submenu.style.opacity = "0";
          chevron.classList.remove("rotate-180");
        }
      });
    });
  });
  
  // مدیریت زیرمنوهای تودرتو
  const submenuItems = document.querySelectorAll(".submenu-item");
  
  submenuItems.forEach((item) => {
    const trigger = item.querySelector(".submenu-trigger");
    const nestedMenu = item.querySelector(".nested-menu");
    const chevron = trigger.querySelector(".chevron");
  
    trigger?.addEventListener("click", (e) => {
      e.stopPropagation();
  
      // بررسی تعداد زیرمنوهای تودرتو
      const nestedMenus = item.querySelectorAll(".nested-menu"); // پیدا کردن همه زیرمنوهای تودرتو
      nestedMenus.forEach((nestedMenu) => {
        if (nestedMenu.style.maxHeight === "0px" || !nestedMenu.style.maxHeight) {
          // باز کردن زیرمنو تودرتو
          nestedMenu.style.maxHeight = `${nestedMenu.scrollHeight}px`; // تنظیم ارتفاع داینامیک
          nestedMenu.style.opacity = "1";
          nestedMenu.classList.add("transition-all", "duration-300");
          chevron.classList.add("rotate-180");
        } else {
          // بستن زیرمنو تودرتو
          nestedMenu.style.maxHeight = "0"; // بستن زیرمنو
          nestedMenu.style.opacity = "0";
          chevron.classList.remove("rotate-180");
        }
      });
    });
  });
  
  
});

// search engine

function loadContentHomePage() {
  loadSearchEngine("search-engine.bc", "searchbox");
}
async function loadSearchEngine(url, sectionload) {
  try {
    var xhrobj = new XMLHttpRequest();
    xhrobj.open("GET", url);
    xhrobj.send();

    xhrobj.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var container = document.getElementById(sectionload);
        container.innerHTML = xhrobj.responseText;

        var scripts = container.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; i++) {
          var scriptTag = document.createElement("script");

          if (scripts[i].src) {
            scriptTag.src = scripts[i].src;
            scriptTag.async = false;
          } else {
            scriptTag.text = scripts[i].textContent;
          }

          document.head
            .appendChild(scriptTag)
            .parentNode.removeChild(scriptTag);
        }

        const pathnamehome = window.location.pathname;
        if (pathnamehome) {
          if (pathnamehome == "/hotel") {
            sessionStorage.setItem("pageName", "hotel");
            $("#Hotel").click(function () {
              $("#flight-type-items").hide();
              $(".nav-module").each(function () {
                var checknav = $(this).attr("data-nav");
                if (checknav == "hotel") {
                  $(this).addClass("nav-module-selected");
                } else {
                  $(this).removeClass("nav-module-selected");
                }
              });
              LoadHotel();
            });
          } else if (pathnamehome == "/flight") {
            sessionStorage.setItem("pageName", "flight");
            $("#Flight").click(function () {
              $("#flight-type-items").show();
              $(".nav-module").each(function () {
                var checknav = $(this).attr("data-nav");
                if (checknav == "flight") {
                  $(this).addClass("nav-module-selected");
                } else {
                  $(this).removeClass("nav-module-selected");
                }
              });
              LoadFlight();
            });
          }
        } else if (pathnamehome == "/tour") {
          sessionStorage.setItem("pageName", "tour");
          $("#Tour").click(function () {
            $("#flight-type-items").hide();
            $(".nav-module").each(function () {
              var checknav = $(this).attr("data-nav");
              if (checknav == "tour") {
                $(this).addClass("nav-module-selected");
              } else {
                $(this).removeClass("nav-module-selected");
              }
            });
            LoadTour();
          });
        }
      }
    };
  } catch (error) {}
}
// async function loadSearchEngine(url, sectionload) {
//   try {
//     var xhrobj = new XMLHttpRequest();
//     xhrobj.open("GET", url);
//     xhrobj.send();
//     xhrobj.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 200) {
//         var container = document.getElementById(sectionload);
//         container.innerHTML = xhrobj.responseText;

//         var scripts = container.getElementsByTagName("script");
//         for (var i = 0; i < scripts.length; i++) {
//           var scriptTag = document.createElement("script");

//           if (scripts[i].src) {
//             scriptTag.src = scripts[i].src;
//             scriptTag.async = false;
//           } else {
//             scriptTag.text = scripts[i].textContent;
//           }

//           document.head
//             .appendChild(scriptTag)
//             .parentNode.removeChild(scriptTag);
//         }
//       }
//     };
//   } catch (error) {}
// }

// کد مشاهده بیشتر/کمتر - برای صفحه article-list-mobile.html
if (document.querySelector('input[name="search"]')) {
  document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.querySelector(".load-more-btn");
    const newsContainer = document.querySelector(".news-container");
    const newsItems = newsContainer.querySelectorAll(".news-item"); // فرض بر این است که هر آیتم دارای کلاس "news-item" است
    let isExpanded = false;

    // تنظیم maxHeight به 222px
    const initialHeight = 222; // ارتفاع ثابت برای دو آیتم
    newsContainer.style.maxHeight = initialHeight + "px";
    newsContainer.style.overflow = "hidden"; // جلوگیری از نمایش آیتم‌های اضافی

    loadMoreBtn?.addEventListener("click", function () {
      if (!isExpanded) {
        // افزایش maxHeight به اندازه کل آیتم‌ها
        newsContainer.style.maxHeight = newsContainer.scrollHeight + "px";
        loadMoreBtn.textContent = "مشاهده کمتر";
      } else {
        // بازگشت به maxHeight اولیه
        newsContainer.style.maxHeight = initialHeight + "px";
        loadMoreBtn.textContent = "مشاهده بیشتر";
      }
      isExpanded = !isExpanded;
    });
  });
}

// کد جستجو - برای صفحه article-list.html
if (document.querySelector('input[name="search"]')) {
  document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector('input[name="search"]');
    const radioItems = Array.from(
      document.querySelectorAll('input[type="radio"][name="radio"]')
    ).map((radio) => radio.parentElement);

    searchInput?.addEventListener("keyup", function () {
      const searchTerm = this.value.trim().toLowerCase();

      radioItems.forEach((item) => {
        const text = item.textContent.trim().toLowerCase();
        item.classList.toggle(
          "hidden",
          !(searchTerm === "" || text.includes(searchTerm))
        );
      });
    });
  });
}

// paging
const FetchPageNumPrev = async (dataPageNum) => {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const cmsQuery = fetchContentArticle.getAttribute("data-catid");
  const pagingResponse = await fetch(
    `/article-load-items.bc?catid=${cmsQuery}&pagenum=${dataPageNum}`
  );
  const pagingData = await pagingResponse.text();
  fetchContentArticle.innerHTML = pagingData;
};

const FetchPageNumNext = async (dataPageNum) => {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const cmsQuery = fetchContentArticle.getAttribute("data-catid");
  const pagingResponse = await fetch(
    `/article-load-items.bc?catid=${cmsQuery}&pagenum=${dataPageNum}`
  );
  const pagingData = await pagingResponse.text();
  fetchContentArticle.innerHTML = pagingData;
};

const FetchWithPageNum = async (dataPageNum) => {
  const fetchContentArticle = document.querySelector(".fetch-content-article");
  const cmsQuery = fetchContentArticle.getAttribute("data-catid");
  const pagingResponse = await fetch(
    `/article-load-items.bc?catid=${cmsQuery}&pagenum=${dataPageNum}`
  );
  const pagingData = await pagingResponse.text();
  fetchContentArticle.innerHTML = pagingData;
};

// کد fetch مقالات - برای صفحه article-list.html
if (document.querySelector('input[name="search"]')) {
  document.addEventListener("DOMContentLoaded", function () {
    const radioButtons = document.querySelectorAll(
      'input[type="radio"][name="radio"]'
    );
    const fetchContentArticle = document.querySelector(
      ".fetch-content-article"
    );

    if (fetchContentArticle) {
      const cmsQuery = fetchContentArticle.getAttribute("data-catid");

      async function firstContent() {
        const firstResponse = await fetch(
          `/article-load-items.bc?catid=${cmsQuery}`
        );
        const firstData = await firstResponse.text();
        fetchContentArticle.innerHTML = firstData;
      }
      firstContent();

      radioButtons.forEach((radio) => {
        radio.addEventListener("change", async function () {
          if (this.checked) {
            const selectedCatId = this.value;
            try {
              fetchContentArticle.innerHTML =
                '<div class="text-center flex justify-center items-center">در حال بارگذاری...</div>';
              const response = await fetch(
                `/article-load-items.bc?catid=${selectedCatId}`
              );
              const data = await response.text();
              fetchContentArticle.innerHTML = data;
            } catch (error) {
              console.error("Error:", error);
              fetchContentArticle.innerHTML =
                '<div class="text-red-500">خطا در بارگذاری مقالات</div>';
            }
          }
        });
      });
    }
  });
}

function uploadDocumentAbout(args) {
  document.querySelector("#about-form .Loading_Form").style.display = "block";
  const captcha = document
    .querySelector("#about-form")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#about-form")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadAbout", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
  console.log(captcha);
}

function refreshCaptchaAbout(e) {
  $bc.setSource("captcha.refreshAbout", true);
}

async function OnProcessedEditObjectAbout(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#about-form .Loading_Form").style.display = "none";
    document.querySelector("#about-form .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaAbout();
    setTimeout(() => {
      document.querySelector("#about-form .Loading_Form").style.display =
        "none";
      document.querySelector("#about-form .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormAbout() {
  // about form
  var inputElementVisa7 = document.querySelector(
    " .username-about input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام و نام خانوادگی");

  var inputElementVisa7 = document.querySelector(
    " .phone-about input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "شماره تلفن");

  var inputElementVisa7 = document.querySelector(
    " .subject-about input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "موضوع");

  var inputElementVisa7 = document.querySelector(
    " .email-about input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");

  var inputElementVisa7 = document.querySelector(
    " .text-about textarea[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "متن");
}

function uploadDocumentFooter(args) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form-resize")
    .querySelector("#captchaContainer input[name='captchaid']").value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.uploadFooter", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
}

function refreshCaptchaFooter(e) {
  $bc.setSource("captcha.refreshFooter", true);
}

async function OnProcessedEditObjectFooter(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#contact-form-resize .Loading_Form").style.display =
      "none";
    document.querySelector("#contact-form-resize .message-api").innerHTML =
      "درخواست شما با موفقیت ثبت شد.";
  } else {
    refreshCaptchaFooter();
    setTimeout(() => {
      document.querySelector(
        "#contact-form-resize .Loading_Form"
      ).style.display = "none";
      document.querySelector("#contact-form-resize .message-api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید.";
    }, 2000);
  }
}

async function RenderFormFooter() {
  var inputElementVisa7 = document.querySelector(
    ".username-footer input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "نام و نام خانوادگی");

  var inputElementVisa7 = document.querySelector(
    " .email-footer input[data-bc-text-input]"
  );
  inputElementVisa7.setAttribute("placeholder", "ایمیل");
}

//  swiper

if (document.querySelector(".ailines-swiper-desktop")) {
  var articlesSwiperDefault = new Swiper(".ailines-swiper-desktop", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  });
  const slides = document.querySelectorAll(
    ".ailines-swiper-desktop .swiper-slide"
  );
  slides.forEach((slide) => {
    slide.style.height = "87.72px";
  });
}
if (document.querySelector(".articles-swiper-default")) {
  var articlesSwiperDefault = new Swiper(".articles-swiper-default", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector(".hotels-swiper")) {
  var hotelsSwiper = new Swiper(".hotels-swiper", {
    slidesPerView: 4,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
  });
  // const slide = document.querySelectorAll(".hotels-swiper .swiper-slide");
  // slide.forEach((slide) => {
  //   slide.style.height = "438px";
  // });
}

if (document.querySelector(".slider-default-mobile")) {
  var sliderDefaultMobile = new Swiper(".slider-default-mobile", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
}

if (document.querySelector(".articles-swiper-tour-list")) {
  var articlesSwiperTourList = new Swiper(".articles-swiper-tour-list", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
}

if (document.querySelector(".slider-tour-list-mobile")) {
  var sliderTourListMobile = new Swiper(".slider-tour-list-mobile", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
}

if (document.querySelector(".articles-swiper-article")) {
  var articlesSwiperArticle = new Swiper(".articles-swiper-article", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-custom",
      prevEl: ".swiper-button-prev-custom",
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
}

if (document.querySelector(".slider-article-mobile")) {
  var sliderArticleMobile = new Swiper(".slider-article-mobile", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: false,
    spaceBetween: 30,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });
}
