const $ = document

const body = $.querySelector("body")
const bars3 = $.querySelector(".bars3")
const headerSubsetOverlay = $.querySelector(".header-subset-overlay")
const headerSubset = $.querySelector(".header-subset")
const xIcon = $.querySelector(".x-icon")
const tourLi = $.querySelector(".tour-li")
const tourSubmenu = $.querySelector(".tour-submenu")
const visaLi = $.querySelector(".visa-li")
const visaSubmenu = $.querySelector(".visa-submenu")

bars3.addEventListener("click", function() {
    headerSubsetOverlay.classList.remove("hidden") 
    headerSubset.classList.remove("translate-x-96") 
    body.classList.add("overflow-y-hidden")
})
xIcon.addEventListener("click", function(){
    headerSubsetOverlay.classList.add("hidden")
    headerSubset.classList.add("translate-x-96")
    body.classList.remove("overflow-y-hidden")
})

tourLi.addEventListener("click", function(){
    tourSubmenu.classList.toggle("invisible")
    tourSubmenu.classList.toggle("opacity-0")
})

visaLi.addEventListener("click", function(){
    visaSubmenu.classList.toggle("invisible")
    visaSubmenu.classList.toggle("opacity-0")
})