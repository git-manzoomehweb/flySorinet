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
