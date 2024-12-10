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
          otherItem
            .querySelector(".submenu")
            ?.classList.add("invisible", "opacity-0");
          otherItem.querySelector(".chevron")?.classList.remove("rotate-180");
        }
      });

      // تغییر وضعیت منوی کلیک شده
      submenu.classList.toggle("invisible");
      submenu.classList.toggle("opacity-0");
      chevron.classList.toggle("rotate-180");
    });
  });

  // مدیریت زیرمنوها
  const submenuItems = document.querySelectorAll(".submenu-item");

  submenuItems.forEach((item) => {
    const trigger = item.querySelector(".submenu-trigger");
    const nestedMenu = item.querySelector(".nested-menu");
    const chevron = trigger.querySelector(".chevron");

    trigger?.addEventListener("click", (e) => {
      e.stopPropagation();

      // بستن سایر زیرمنوها
      submenuItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.querySelector(".nested-menu")?.classList.remove("max-h-40");
          otherItem.querySelector(".nested-menu")?.classList.add("max-h-0");
          otherItem.querySelector(".chevron")?.classList.remove("rotate-180");
        }
      });

      // تغییر وضعیت زیرمنوی کلیک شده
      nestedMenu.classList.toggle("max-h-0");
      nestedMenu.classList.toggle("max-h-40");
      chevron.classList.toggle("rotate-180");
    });
  });
});

// کد مشاهده بیشتر/کمتر - برای صفحه article-list-mobile.html
if (document.querySelector('input[name="search"]')) {
  document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.querySelector(".load-more-btn");
    const newsContainer = document.querySelector(".news-container");
    let isExpanded = false;

    loadMoreBtn?.addEventListener("click", function () {
      if (!isExpanded) {
        newsContainer.style.maxHeight = newsContainer.scrollHeight + "px";
        loadMoreBtn.textContent = "مشاهده کمتر";
      } else {
        newsContainer.style.maxHeight = "250px";
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
        const firstResponse = await fetch(`/article-load-items.bc?${cmsQuery}`);
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
  console.log(captcha)
}

function refreshCaptchaAbout(e) {
  $bc.setSource("captcha.refreshAbout", true);
}



async function OnProcessedEditObjectAbout(args) {
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  if (errorid == "6") {
    document.querySelector("#about-form .Loading_Form").style.display =
      "none";
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
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });
}

if (document.querySelector(".hotels-swiper")) {
  var hotelsSwiper = new Swiper(".hotels-swiper", {
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
        slidesPerView: 3,
        spaceBetween: 50,
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
