const $ = document

const bars3 = $.querySelector(".bars3")
const headerSubset = $.querySelector(".header-subset")
const xIcon = $.querySelector(".x-icon")

bars3.addEventListener("click", function() {
    headerSubset.style.display = "block"
})
xIcon.addEventListener("click", function(){
    headerSubset.style.display= "none"
})