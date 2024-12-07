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
      e.stopPropagation(); // جلوگیری از بسته شدن منوی والد

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


function uploadDocumentFooter(args) {
  document.querySelector("#contact-form-resize .Loading_Form").style.display =
    "block";
  const captcha = document
    .querySelector("#contact-form-resize.form-container")
    .querySelector("#captchaContainer input[name='captcha']").value;
  const captchaid = document
    .querySelector("#contact-form-resize.form-container")
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

function captchaRenderedFooter() {
  document.querySelector("#contact-form-resize .contactUsInput").placeholder =
    "کد امنیتی";
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
