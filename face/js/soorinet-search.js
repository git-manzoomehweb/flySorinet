$(document).ready(function () {
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

  $("#FlightHotel").click(function () {
    $("#flight-type-items").hide();
    $(".nav-module").each(function () {
      var checknav = $(this).attr("data-nav");
      if (checknav == "flighthotel") {
        $(this).addClass("nav-module-selected");
      } else {
        $(this).removeClass("nav-module-selected");
      }
    });
    LoadFlightHotel();
  });

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


});


function LoadHotel() {
  $("#flight-type-items").hide();
  $("#Hotel").addClass("active-module");
  $("#Hotel").siblings("li").removeClass("active-module");
  $("#item-Hotel").show();
  $("#item-Flight,#item-Tour,#item-FlightHotel,#item-Insurance").hide();
  changeParentBackground('hotel-background-merge.png')
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}
function LoadFlight() {
  $("#flight-type-items").show();
  $("#Flight").addClass("active-module");
  $("#Flight").siblings("li").removeClass("active-module");
  $("#item-Flight").show();
  $("#item-Hotel,#item-Tour,#item-FlightHotel,#item-Insurance").hide();
  changeParentBackground('flight-background-merge.png')
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}

function LoadFlightHotel() {
  $("#flight-type-items").hide();
  $("#FlightHotel").addClass("active-module");
  $("#FlightHotel").siblings("li").removeClass("active-module");
  $("#item-FlightHotel").show();
  $("#item-Flight,#item-Hotel,#item-Tour,#item-Insurance").hide();
  changeParentBackground('hotelFlight-background-merge.png')
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}

function LoadTour() {
  $("#flight-type-items").hide();
  $("#Tour").addClass("active-module");
  $("#Tour").siblings("li").removeClass("active-module");
  $("#item-Tour").show();
  $("#item-Flight,#item-Hotel,#item-FlightHotel,#item-Insurance").hide();
  changeParentBackground('tour-background-merge.png')
  if ($(".engine-content").hasClass("max-lg:hidden")) {
    $(".engine-content").removeClass("max-lg:hidden");
  }
}


if ($(".checkparent_page").val() == "true") {
  $("#Flight").addClass("inactive");
  $("#Tour").removeClass("inactive");
  $(".r-tour").css("display", "block");
  $(".r-flight").css("display", "none");
}

$(".FlightClass").each(function () {
  $(this).change(function () {
    var flightclass = $(this).val();
    var text;
    switch (flightclass) {
      case "Economy":
        text = "اکونومی";
        break;
      case "BusinessClass":
        text = "بیزینس";
        break;
      case "FirstClass":
        text = "فرست";
        break;
    }
    $(this).closest("form").find(".class-select").text(text);
  });
});

const prevButton = document.querySelectorAll(".prevButton");
const nextButton = document.querySelectorAll(".nextButton");

// رویداد برای دکمه قبلی
prevButton.forEach((element) => {
  var sliderSelect = element
    .closest(".flightclass-container")
    .querySelector(".sliderSelect");
  element.addEventListener("click", () => {
    if (sliderSelect.selectedIndex > 0) {
      sliderSelect.selectedIndex--;
    } else {
      sliderSelect.selectedIndex = sliderSelect.options.length - 1; // برگشت به آخرین گزینه
    }
    var flightclass = sliderSelect.options[sliderSelect.selectedIndex].value;
    var text;
    switch (flightclass) {
      case "Economy":
        text = "اکونومی";
        break;
      case "BusinessClass":
        text = "بیزینس";
        break;
      case "FirstClass":
        text = "فرست";
        break;
    }
    element.closest("form").querySelector(".class-select").innerText = text;
  });
});

// رویداد برای دکمه بعدی
nextButton.forEach((element) => {
  var sliderSelect = element
    .closest(".flightclass-container")
    .querySelector(".sliderSelect");
  element.addEventListener("click", () => {
    if (sliderSelect.selectedIndex < sliderSelect.options.length - 1) {
      sliderSelect.selectedIndex++;
    } else {
      sliderSelect.selectedIndex = 0; // برگشت به اولین گزینه
    }
    var flightclass = sliderSelect.options[sliderSelect.selectedIndex].value;
    var text;
    switch (flightclass) {
      case "Economy":
        text = "اکونومی";
        break;
      case "BusinessClass":
        text = "بیزینس";
        break;
      case "FirstClass":
        text = "فرست";
        break;
    }
    element.closest("form").querySelector(".class-select").innerText = text;
  });
});
//<!----------------------------END JS SEARCHBOX ------------------------------>

function setFlightType(ele, element) {
  var flighttype = ele;
  document.getElementById("sliderSelect").selectedIndex = 0;
  $(element).find("input[type='radio']").prop("checked", true);
  if (flighttype == "oneway") {
    $("#item-Flight").find("form").attr("data-flightType", "1");
    $(element).addClass("active-flight-type");
    $("#backtoback").removeClass("active-flight-type");
    $("#multiflight").removeClass("active-flight-type");

    $("#multi-flight-form").addClass("hidden");
    $("#flight-form").removeClass("hidden");

    $(element)
      .closest("#item-Flight")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Flight").find("#flight-form").find(".end_date").val("");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date").closest("div")
      .addClass("Noactive-date");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest(".bg-white")
      .addClass("opc-50");
    $("#flight-form").attr("action", "/Tem3_Oneway_Search.bc");
    if ($(window).width() <= 1024) {
      $("#flight-form").attr("action", "/M_Oneway_Search.bc");
    }
  } else if (flighttype == "roundtrip") {
    $("#item-Flight").find("form").attr("data-flightType", "2");
    $(element).addClass("active-flight-type");

    $("#oneway").removeClass("active-flight-type");
    $("#multiflight").removeClass("active-flight-type");

    $("#multi-flight-form").addClass("hidden");
    $("#flight-form").removeClass("hidden");

    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .addClass("nextCalOpening");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .prop("disabled", false);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", false);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date").closest("div")
      .removeClass("Noactive-date");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest(".bg-white")
      .removeClass("opc-50");
    $("#flight-form").attr("action", "/Tem3_Roundtrip_Search.bc");
    if ($(window).width() <= 1024) {
      $("#flight-form").attr("action", "/M_Roundtrip_Search.bc");
    }
  } else if (flighttype == "multicity") {
    $("#item-Flight").find("form").attr("data-flightType", "1");
    $(element).addClass("active-flight-type");
    $("#backtoback").removeClass("active-flight-type");
    $("#oneway").removeClass("active-flight-type");

    $("#multi-flight-form").removeClass("hidden");
    $("#flight-form").addClass("hidden");

    $(element)
      .closest("#item-Flight")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Flight").find(".end_date").val("");
    $("#item-Flight").find(".end_date").prop("disabled", true);
    $("#item-Flight")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Flight").find(".end_date").closest("div").addClass("Noactive-date");
    $("#item-Flight").find(".end_date").closest(".bg-white").addClass("opc-50");
    if ($(window).width() <= 1024) {
      $("#multi-flight-form").attr("action", "/M_Multicity_Search.bc");
    }
  } else {
    $("#item-Flight").find("form").attr("data-flightType", "1");
    $(element).addClass("active-flight-type");

    $("#backtoback").removeClass("active-flight-type");
    $("#multiflight").removeClass("active-flight-type");

    $("#multi-flight-form").addClass("hidden");
    $("#flight-form").removeClass("hidden");

    $(element)
      .closest("#item-Flight")
      .find(".end_date")
      .removeClass("nextCalOpening");
    $("#item-Flight").find("#flight-form").find(".end_date").val("");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest("div")
      .find(".date-value")
      .prop("disabled", true);
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date").closest("div")
      .addClass("Noactive-date");
    $("#item-Flight")
      .find("#flight-form")
      .find(".end_date")
      .closest(".bg-white")
      .addClass("opc-50");
    $("#flight-form").attr("action", "/Tem3_Oneway_Search.bc");
    if ($(window).width() <= 1024) {
      $("#flight-form").attr("action", "/M_Oneway_Search.bc");
    }
  }
}

// function setFlightClass(element) {
//   let valueFC = element.value;
//   let textFC = element.options[element.selectedIndex].text;
//   let flightForm = document.getElementById("flight-form");
//   let flightMCForm = document.getElementById("multi-flight-form");

//   if (!flightForm.classList.contains("hidden")) {
//     $(flightForm).find(".select-flight-class").val(valueFC);
//     $(flightForm).find(".class-select").text(textFC);
//   }

//   if (!flightMCForm.classList.contains("hidden")) {
//     $(flightMCForm).find(".select-flight-class").val(valueFC);
//     $(flightMCForm).find(".class-select").text(textFC);
//   }
// }

$(document).ready(function () {
  $("#multi-flight-form").addClass("hidden");

  if ($(window).width() <= 1024) {
    if ($("#flight-form").attr("action") == "/Tem3_Roundtrip_Search.bc") {
      $("#flight-form").attr("action", "/M_Roundtrip_Search.bc");
    }
    if ($("#flight-form").attr("action") == "/Tem3_Oneway_Search.bc") {
      $("#flight-form").attr("action", "/M_Oneway_Search.bc");
    }
    $("#multi-flight").attr("action", "/M_Multicity_Search.bc");
    $("#hotel-form").attr("action", "/M_Hotel_Search.bc");
    $("#flightHotel-form").attr("action", "/M_FlightHotel_Search.bc");
    $("#Insurance-form").attr("action", "/M_Insurance_Search.bc");
    $("#Tour-form").attr("action", "/M_Tour_Search.bc");
  }
});

function flight_class(element) {
  $(".flight-class").text($(element).find("option:selected").text());
}

function openNextCal(e) {
  let activeBtn = $(".search-nav ul > .active-module").attr("data-id");
  if (activeBtn == "item-FlightHotel") {
    if ($(".check-hotel-date-container").is(":visible")) {
      if ($(".check-hotel-date-container").find(".checkin").val() != "") {
        let returnDate = $(".check-hotel-date-container")
          .find(".nextCalOpeningex")
          .val();
        if (returnDate == "") {
          $(".check-hotel-date-container")
            .find(".nextCalOpeningex")
            .trigger("onclick");
        }
      } else {
        let returnDate = $("#" + activeBtn)
          .find(".nextCalOpening")
          .val();
        if (returnDate == "") {
          $("#" + activeBtn)
            .find(".nextCalOpening")
            .trigger("onclick");
        }
      }
    } else {
      let returnDate = $("#" + activeBtn)
        .find(".nextCalOpening")
        .val();
      if (returnDate == "") {
        $("#" + activeBtn)
          .find(".nextCalOpening")
          .trigger("onclick");
      }
    }
  } else {
    let returnDate = $("#" + activeBtn)
      .find(".nextCalOpening")
      .val();
    if (returnDate == "") {
      $("#" + activeBtn)
        .find(".nextCalOpening")
        .trigger("onclick");
    }
  }
}
////////<!----- JS  FLIGHT ---->////////
function empty_value(t) {
  $(t).closest(".city").find(".country").val(""),
    $(t).closest(".city").find(".searchList").fadeIn(),
    $(t).closest(".city").find(".country").focus(),
    $(t).closest(".city").find(".ul-list").show(),
    $(t).closest(".city").siblings(".city").find(".searchList").fadeOut();
}

$(".country").each(function () {
  $(this).on("blur", function () {
    if ($(this).closest(".city").find(".countryFlight").text().length > 0) {
      if (0 == hoverelse) {
        var t = $(this)
          .closest(".city")
          .find(".countryFlight")
          .children(".selectCountry:first")
          .find(".txtcountry")
          .text(),
          e =
            (t.split(" "),
              $(this)
                .closest(".city")
                .find(".countryFlight")
                .children(".selectCountry:first")
                .find(".countryid")
                .val());
        $(this).closest(".city").find(".country").val(t);
        var i = t.split("(");
        $(this).closest(".city").find(".split-text").text(i[0]),
          $(this).closest(".city").find(".text-value").val(t),
          $(this).closest(".city").find(".co-id").val(e),
          $(this).closest(".city").find(".countryFlight").empty();
      }
    } else $(this).closest(".city").find(".mini-loading").css("display", "none");
  });
});

// $('.country').each(function () {
//   $(this).on('keyup', function (e) {
//       $(this).closest(".city").find(".searchList").slideUp()
//   });
//   $(this).on('blur', function () {
//       if ($(this).closest(".city").find(".countryFlight").text().length > 0) {
//           // if (hoverelse == 0) {
//               var defresult = $(this).closest(".city").find(".countryFlight")
//                   .children(".selectCountry:first").find(".txtcountry")
//                   .text();
//               var spl = defresult.split(" ");
//               var defresultid = $(this).closest(".city").find(".countryFlight").children(".selectCountry:first").find(".countryid").val();
//               $(this).closest(".city").find(".country").val(defresult);
//               $(this).closest(".city").find(".co-id").val(defresultid);
//               $(this).closest(".city").find(".countryFlight").empty();
//           // }
//       } else {
//           $(this).closest(".city").find(".mini-loading").css("display", "none")
//           $(this).closest(".city").find(".country").val('');
//           $(this).closest(".city").find(".co-id").val('');
//       }
//   });

// });

$("#Tour-form .country").on("keyup", function () {
  var t = $(this).val().toLowerCase();
  $(".selectCountry").hide(),
    $(".selectCountry")
      .filter(function () {
        return $(this).text().toLowerCase().includes(t);
      })
      .show();
});

$(document).on("click", function (t) {
  $(t.target).closest(
    ".searchList,.country,.selectCountry,.city, .form-search-input"
  ).length || $(".searchList").slideUp(),
    $(t.target).closest(
      ".hotel-input , .count-adult , .count-child , .count-room , .count-adultRoom , .count-childRoom , .fclass , .HotelPassengers div , HotelPassengers span"
    ).length || $(".HotelPassengers").removeClass("block");
});

function city_search(t) {
  // چک کردن اینکه کدام کلید فشار داده شده است
  if (t.which === 0 || t.ctrlKey || t.metaKey || t.altKey) return;

  // چک کردن مقدار data-type
  if ($(t).attr("data-type") == "4") {
    $(t).val("");
    $(t).closest(".city").find(".co-id").val("");
    $(t).closest(".city").find(".mini-loading").show();
    // if ($(t).attr('data-active') == 0) {
    $.ajax({
      url: "/Client_City_Search.bc",
      type: "get",
      data: {
        type: $(t).attr("data-type"),
        lid: "1",
      },
      success: function (e) {
        $(t).attr("data-active", "1");
        $(t).closest(".city").find(".mini-loading").hide();
        $(t).closest(".city").find(".countryFlight").empty().html(e);
        $(t).closest(".city").find(".countryFlight").slideDown();
      },
    });
    // }else{
    //   $(t).closest(".city").find(".countryFlight").slideDown()
    // }
  } else {
    // تبدیل اولین حرف به بزرگ و بقیه به کوچک
    let upper_case =
      $(t).val().substr(0, 1).toUpperCase() +
      $(t).val().substr(1).toLowerCase();
    $(t).val(upper_case);

    if ($(t).attr("data-type") == "3") {
      if ($(t).val() == "رم" || $(t).val() == "قم") {
        if ($(t).val().length > 1) {
          $(t).closest(".city").find(".mini-loading").show();
          $(t).closest(".city").find(".ul-list").hide();

          $.ajax({
            url: "/Client_City_Search.bc",
            type: "get",
            data: {
              term: $(t).val(),
              type: $(t).attr("data-type"),
              lid: 1,
              select_value: 0,
            },
            success: function (e) {
              $(t).closest(".city").find(".mini-loading").hide();
              $(t).closest(".city").find(".countryFlight").empty().html(e);
            },
          });
        } else {
          $(t).closest(".city").find(".countryFlight").empty();
          $(t).closest(".city").find(".ul-list").show();
        }
      } else if ($(t).val().length > 2) {
        $(t).closest(".city").find(".mini-loading").show();
        $(t).closest(".city").find(".ul-list").hide();

        $.ajax({
          url: "/Client_City_Search.bc",
          type: "get",
          data: {
            term: $(t).val(),
            type: $(t).attr("data-type"),
            lid: 1,
            select_value: 0,
          },
          success: function (e) {
            $(t).closest(".city").find(".mini-loading").hide();
            $(t).closest(".city").find(".countryFlight").empty().html(e);
          },
        });
      } else {
        $(t).closest(".city").find(".countryFlight").empty();
        $(t).closest(".city").find(".ul-list").show();
      }
    } else if ($(t).attr("data-type") !== "3") {
      if ($(t).val().length > 2) {
        $(t).closest(".city").find(".mini-loading").show();
        $(t).closest(".city").find(".ul-list").hide();

        $.ajax({
          url: "/Client_City_Search.bc",
          type: "get",
          data: {
            term: $(t).val(),
            type: $(t).attr("data-type"),
            lid: 1,
            select_value: 0,
          },
          success: function (e) {
            $(t).closest(".city").find(".mini-loading").hide();
            $(t).closest(".city").find(".countryFlight").empty().html(e);
          },
        });
      } else {
        $(t).closest(".city").find(".countryFlight").empty();
        $(t).closest(".city").find(".ul-list").show();
      }
    }
  }
}

function SelectPlace(element) {
  var idSelected = $(element).attr("data-id");
  var textSelected = $(element).find("span").text();
  $(element).closest(".city").find(".country").val(textSelected);
  $(element).closest(".city").find(".co-id").val(idSelected);
  $(element).closest(".city").find(".searchList").fadeOut();
  if (element.closest("#flight-form")) {
    if ($(element).closest(".city").find(".FCD2").val()) {
      $(element)
        .closest("form")
        .find(".Basis_Date_Box")
        .find(".start_date")
        .trigger("onclick");
    } else {
      $(element)
        .closest(".city")
        .next()
        .next(".city")
        .find(".country")
        .trigger("onclick");
    }
  } else if (element.closest("#flightHotel-form")) {
    if ($(element).closest(".city").find(".FCD2").val()) {
      $(element)
        .closest("form")
        .find("#flight-hotel-boxes .Basis_Date_Box")
        .find(".start_date")
        .trigger("onclick");
    } else {
      $(element)
        .closest(".city")
        .next()
        .next(".city")
        .find(".country")
        .trigger("onclick");
    }
  } else if (element.closest("#multi-flight-form")) {
    if ($(element).closest(".city").find(".FCD2").val()) {
      $(element)
        .closest(".route-content")
        .find(".Basis_Date_Box")
        .find(".start_date")
        .trigger("onclick");
    } else {
      $(element)
        .closest(".city")
        .next()
        .next(".city")
        .find(".country")
        .trigger("onclick");
    }
  } else if (element.closest("#hotel-form")) {
    $(element)
      .closest("#hotel-form")
      .find(".Basis_Date_Box")
      .find(".start_date")
      .trigger("onclick");
  }
}

$(document).on("click", function (event) {
  if (!$(event.target).closest(".searchList,.country,.selectCountry").length) {
    $(".searchList").fadeOut();
  }
  if (
    !$(event.target).closest(
      ".passenger_section,#ui-datepicker-div,.flightclass-container,.FlightClass , .flight-class ,.Wrapper-CountPassenger,.plus-minus,.plus-minus-ch,.plus-minus-room,.createChildDropdown select,.add-room,.plus-minus-ins,.BithdatePassenger,.nice-select .option,.item-CountPassenger input"
    ).length
  ) {
    $(".CountPassenger").fadeOut();
  }
});

function show_passengers(element) {
  $(element).closest("form").find(".CountPassenger").fadeIn();
}
$(".confirm").click(function (e) {
  $(this).closest(".CountPassenger").fadeOut();
});

$(".plus-minus").on("click", function () {
  if (
    !$(this).closest("#item-Hotel") &&
    !$(this).closest("#item-FlightHotel") &&
    !$(this).closest("#item-Tour")
  ) {
    var button = $(this);
    var oldVal = parseInt(
      button.closest(".item-CountPassenger").find("input").val()
    );
    var newVal =
    button.find("span").hasClass("plus-btn")
        ? oldVal + 1
        : oldVal > 0
          ? oldVal - 1
          : 0;
    if (newVal >= 2) {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .addClass("minus-btn-active");
    }
    if (newVal < 2) {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .removeClass("minus-btn-active");
    }
    if (newVal >= 10) return;
    if (newVal < 1) return;
    button.closest(".item-CountPassenger").find("input").val(newVal);
    var passengers_count =
      parseInt(button.closest("form").find(".child-count").val()) +
      parseInt(newVal);
    button
      .closest("form")
      .find(".count-passengers .count")
      .text(passengers_count);
  }
});
$(".plus-minus-ch").on("click", function () {
  if (
    !$(this).closest("#item-Hotel").length &&
    !$(this).closest("#item-FlightHotel").length &&
    !$(this).closest("#item-Tour").length
  ) {
    var button = $(this);
    var oldVal = parseInt(
      button.closest(".item-CountPassenger").find("input").val()
    );
    var newVal =
      button.find("span").hasClass("plus-btn")
        ? oldVal + 1
        : oldVal > 0
          ? oldVal - 1
          : 0;
    if (newVal >= 1) {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .addClass("minus-btn-active");
    }
    if (newVal < 1) {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .removeClass("minus-btn-active");
    }
    if (newVal >= 5) return;
    button.closest(".item-CountPassenger").find("input").val(newVal);
    if (newVal == 0) {
      button.closest(".item-CountPassenger").find(".child").val(newVal);
    } else {
      button
        .closest(".item-CountPassenger")
        .find(".child")
        .val(newVal + ",");
    }
    var passengers_count =
      parseInt(button.closest("form").find(".adult").val()) + parseInt(newVal);
    button
      .closest("form")
      .find(".count-passengers .count")
      .text(passengers_count);
    if (oldVal < newVal) {
      button
        .closest(".item-CountPassenger")
        .find(".section-select-age")
        .append(createChildDropdown(newVal));
    } else if (oldVal > newVal) {
      destroyChildDropdown(
        button.closest(".item-CountPassenger").find(".section-select-age"),
        newVal
      );
    }
  }
});

var createChildDropdown = function (i) {
  var $childDropdown = $("<div />", {
    class: "createChildDropdown flex justify-between my-2 py-2",
  });
  $childDropdown.append(
    $("<label />", {
      for: "childDropdown-" + i,
    }).text("سن کودک " + i)
  );
  $childDropdown.append($("<select class='w-8/12 bg-transparent ' />"));
  var options = [
    "تا 1 سال",
    "1 تا 2  ",
    "2 تا 3 ",
    "3 تا 4  ",
    "4 تا 5 ",
    "5 تا 6 ",
    "6 تا 7 ",
    "7 تا 8 ",
    "8 تا 9 ",
    "9 تا 10 ",
    "10 تا 11 ",
    "11 تا 12 ",
  ];
  options.forEach(function (option, index) {
    $childDropdown.find("select").append(
      $("<option />")
        .text(option)
        .attr("value", index + 1)
    );
  });
  return $childDropdown;
};
var destroyChildDropdown = function ($el, i) {
  $el.find("div.createChildDropdown").get(i).remove();
};
$(".exchange-icon").click(function () {
  var dep = $(this).closest("form").find(".FCD1").val();
  var des = $(this).closest("form").find(".FCD2").val();
  var depid = $(this).closest("form").find(".FCDid1").val();
  var desid = $(this).closest("form").find(".FCDid2").val();
  $(this).closest("form").find(".FCD1").val(des);
  $(this).closest("form").find(".FCD2").val(dep);
  $(this).closest("form").find(".FCDid1").val(desid);
  $(this).closest("form").find(".FCDid2").val(depid);
});

////////<!----- JS  INSURANCE ---->////////
$(".plus-minus-ins").on("click", function () {
  var button = $(this);
  var oldVal = parseInt(
    button.closest(".item-CountPassenger").find("input").val()
  );
  var newVal =
  button.find("span").hasClass("plus-btn") ? oldVal + 1 : oldVal > 0 ? oldVal - 1 : 0;
  if (newVal >= 1) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .addClass("minus-btn-active");
  }
  if (newVal < 1) {
    button
      .closest(".item-CountPassenger")
      .find(".minus-btn")
      .removeClass("minus-btn-active");
  }
  if (newVal >= 9) return;
  if (newVal < 1) return;
  button.closest(".item-CountPassenger").find(".passengercount").val(newVal);
  button.closest("form").find(".count-passengers .count").text(newVal);
  if (oldVal < newVal) {
    button
      .closest(".item-CountPassenger")
      .find(".Wrapper-BirthdatePassenger")
      .empty();
    for (var i = 1; i <= newVal; i++) {
      button
        .closest(".item-CountPassenger")
        .find(".Wrapper-BirthdatePassenger")
        .append(
          '<div class="BirthdatePassenger my-4"><label class="label w-full border-b-2 border-white border-dashed block pb-2 mt-3">تاریخ تولد مسافر ' +
          i +
          '</label><input class="datepicker BithdatePassenger passenger-bithdate w-full block h-10 leading-10 mt-2 bg-transparent" placeholder="تاریخ میلادی" type="text" autocomplete="off" readonly required><div class="clr"></div></div>'
        );
    }
  } else if (oldVal > newVal) {
    destroyInsurancePassenger(
      button
        .closest(".item-CountPassenger")
        .find(".Wrapper-BirthdatePassenger"),
      newVal
    );
  }
  $(".datepicker").focus(function (e) {
    FDatepicker(this, {
      single: !0,
      isJalali: isJalali,
      changeMonth: !0,
      changeYear: !0,
      minDate: "-100y",
      maxDate: $("#AdaultMaxDate").val(),
      yearRangeJalali: "1250:1500",
      yearRangeGregorian: "1900:2030",
      numberOfMonths: 1,
    });
    var innerContent = $(".nice-select > ul");
    var option_height = $(".nice-select .option").height();
    var option_count = $(".nice-select .option").length;
    var Ul_height = parseInt(option_height) * parseInt(option_count);
    innerContent.scrollTop(Ul_height / 2);
  });
});
var destroyInsurancePassenger = function ($el, i) {
  $el.find("div.BirthdatePassenger").get(i).remove();
};

$("#Insurance-form").submit(function (i) {
  $(this)
    .find(".datepicker")
    .each(function () {
      $(this).val().length < 1 &&
        ($(this).css("border-color", "red"),
          $(".NotEnteringBirthadate").show(),
          $(this).closest("form").find(".CountPassenger").slideDown(),
          i.preventDefault());
    });
  var t = "";
  $(this)
    .find(".BirthdatePassenger")
    .each(function (i, e) {
      t = t + '"' + $(this).find(".datepicker").val() + '",';
    }),
    $(this).find(".birthday").val(t);
  var e = $(this)
    .find(".birthday")
    .val()
    .replace(/,(?=[^,]*$)/, "");
  $(this).find(".birthday").val(e);
});
////////<!----- JS  HOTEL/TOUR ---->////////
// Hotel and Hotel+Flight room-passengers last-update
$(document)
  .off("click", ".plus-minus-room")
  .on("click", ".plus-minus-room", function () {
    var button = $(this);
    var form = button.closest("form");
    var oldVal =
      parseInt(button.closest(".item-CountPassenger").find("input").val()) || 0;
    var newVal = button.find("span").hasClass("plus-btn") ? oldVal + 1 : oldVal - 1;

    if (newVal >= 2) {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .addClass("minus-btn-active");
    } else {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .removeClass("minus-btn-active");
    }

    if (newVal >= 5 || newVal <= 0) return;

    button.closest(".item-CountPassenger").find("input").val(newVal);
    form.find(".count-passengers .count-room").text(newVal);

    if (button.find("span").hasClass("plus-btn")) {
      addRoom(form, newVal);
    } else {
      form.find(".ShowRow .contentRoom").last().remove();
    }
    updateTotalPassengers(form);
  });

function addRoom(form, roomNumber) {
  var newRoomHtml = `
      <div class="contentRoom">
  <div class="RoomRow mb-3">اتاق ${roomNumber}</div>
  <div class="item-CountPassenger mb-4">
    <div
      class="first-part-CountPassenger w-full border-b-2 border-white border-dashed block pb-2 mt-3">بزرگسال
      (+12)</div>
    <div
      class="flex items-center justify-between w-full second-part-CountPassenger">
      <div
        class="flex items-center justify-center w-12 h-12 passenger-button plus-minus">
        <span
          class="flex items-center justify-center w-12 h-12 p-2 rounded-xl bg-Primery-600 cursor-pointer plus-btn leading-btnclick group-hover:bg-secondary-600 hover:scale-105 ">
          <img
            src="http://cdn.basiscore.net/d108h111.undertest.ir/images/plusIcon.svg"
            alt="plusIcon" width="24" height="24" loading="lazy"></span>
      </div>
      <div class="text-base passenger-button w-full"><input type="text"
          name="_root.rooms__${roomNumber}.adultcount"
          class="p-3 font-medium text-center border border-solid bg-zinc-50 rounded-xl border-zinc-100 w-full outline-none adult adult-count"
          readonly value="2"></div>
      <div
        class="flex items-center justify-center w-12 h-12 passenger-button plus-minus">
        <span
          class="flex items-center justify-center w-12 h-12 p-2 rounded-xl bg-Primery-600 cursor-pointer minus-btn leading-btnclick group-hover:bg-secondary-600 hover:scale-105"><img
            src="http://cdn.basiscore.net/d108h111.undertest.ir/images/minusIcon.svg"
            alt="minusIcon" width="24" height="24" loading="lazy"></span>
      </div>
    </div>

  </div>
  <div class="item-CountPassenger mb-4">
    <div
      class="first-part-CountPassenger w-full border-b-2 border-white border-dashed block pb-2 mt-3">کودک
      (-12)</div>
    <div
      class="flex items-center justify-between w-full second-part-CountPassenger">
      <div
        class="flex items-center justify-center w-12 h-12 passenger-button plus-minus-ch">
        <span
          class="flex items-center justify-center w-12 h-12 p-2 rounded-xl bg-Primery-600 cursor-pointer plus-btn leading-btnclick group-hover:bg-secondary-600 hover:scale-105">
          <img
            src="http://cdn.basiscore.net/d108h111.undertest.ir/images/plusIcon.svg"
            alt="plusIcon" width="24" height="24" loading="lazy"></span>
      </div>
      <div class="text-base passenger-button w-full"><input type="text"
          class="p-3 font-medium text-center border border-solid bg-zinc-50 rounded-xl border-zinc-100 w-full outline-none child-count"
          readonly value="0"><input type="hidden" value="0" class="childcountandage" name="_root.rooms__${roomNumber}.childcountandage"/></div>
      <div
        class="flex items-center justify-center w-12 h-12 passenger-button plus-minus-ch">
        <span
          class="flex items-center justify-center w-12 h-12 p-2 rounded-xl bg-Primery-600 cursor-pointer minus-btn leading-btnclick group-hover:bg-secondary-600 hover:scale-105"><img
            src="http://cdn.basiscore.net/d108h111.undertest.ir/images/minusIcon.svg"
            alt="minusIcon" width="24" height="24" loading="lazy"></span>
      </div>
    </div>
    <div
      class="section-select-age leading-38px divide-y divide-white divide-dashed w-full flex-col justify-items-stretch"></div>
  </div>
</div>`;

  form.find(".ShowRow").append(newRoomHtml);
}

function updateTotalPassengers(form) {
  // دسترسی به id از طریق attr
  var formId = $(form).attr("id");
  if (
    formId === "flightHotel-form" ||
    formId === "hotel-form" ||
    formId === "Tour-form"
  ) {
    var totalPassengers = 0;

    $(form)
      .find(".contentRoom")
      .each(function () {
        var adultCount = parseInt($(this).find(".adult").val()) || 0;
        var childCount = parseInt($(this).find(".child-count").val()) || 0;
        totalPassengers += adultCount + childCount;
      });

    $(form).find(".count-passengers .count").text(totalPassengers);
  } else {
    var totalPassengers = 0;

    $(form)
      .find(".item-CountPassenger")
      .each(function () {
        var adultCount = parseInt($(this).find(".adult").val()) || 0;
        var childCount = parseInt($(this).find(".child-count").val()) || 0;
        totalPassengers += adultCount + childCount;
      });

    $(form).find(".count-passengers .count").text(totalPassengers);
  }
}

$(document)
  .off("click", " .plus-minus .plus-btn, .plus-minus .minus-btn")
  .on("click", " .plus-minus .plus-btn, .plus-minus .minus-btn", function () {
    var button = $(this);
    var input = button.closest(".item-CountPassenger").find(".adult");
    var oldVal = parseInt(input.val()) || 1;
    var newVal = button.hasClass("plus-btn")
      ? Math.min(9, oldVal + 1)
      : Math.max(1, oldVal - 1);

    if (newVal >= 2) {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .addClass("minus-btn-active");
    } else {
      button
        .closest(".item-CountPassenger")
        .find(".minus-btn")
        .removeClass("minus-btn-active");
    }

    input.val(newVal);
    updateTotalPassengers(button.closest("form")[0]);
  });

$(document)
  .off(
    "click",
    "#hotel-form .plus-minus-ch .plus-btn, #hotel-form .plus-minus-ch .minus-btn , #flightHotel-form .plus-minus-ch .plus-btn, #flightHotel-form .plus-minus-ch .minus-btn , #Tour-form .plus-minus-ch .plus-btn, #Tour-form .plus-minus-ch .minus-btn ,"
  )
  .on(
    "click",
    " #hotel-form .plus-minus-ch .plus-btn, #hotel-form .plus-minus-ch .minus-btn ,#flightHotel-form .plus-minus-ch .plus-btn, #flightHotel-form .plus-minus-ch .minus-btn , #Tour-form .plus-minus-ch .plus-btn, #Tour-form .plus-minus-ch .minus-btn",
    function () {
      var button = $(this);
      var input = button.closest(".item-CountPassenger").find(".child-count");
      var oldVal = parseInt(input.val()) || 0;
      var newVal = button.hasClass("plus-btn")
        ? Math.min(4, oldVal + 1)
        : Math.max(0, oldVal - 1);

      if (newVal >= 1) {
        button
          .closest(".item-CountPassenger")
          .find(".minus-btn")
          .addClass("minus-btn-active");
      } else {
        button
          .closest(".item-CountPassenger")
          .find(".minus-btn")
          .removeClass("minus-btn-active");
      }

      input.val(newVal);
      updateTotalPassengers(button.closest("form"));

      var ageContainer = button
        .closest(".item-CountPassenger")
        .find(".section-select-age");
      ageContainer.empty();

      for (let i = 1; i <= newVal; i++) {
        ageContainer.append(createChildDropdown(i));
      }
    }
  );

function createChildDropdown(index) {
  return `<select name="child_age_${index}" class="child-age w-8/12 bg-transparent">
      <option value="">سن کودک ${index}</option>
      ${Array.from(
    { length: 12 },
    (_, i) => `<option value="${i + 1}">${i + 1}</option>`
  ).join("")}
    </select>`;
}
// Hotel and Hotel+Flight room-passengers last-update

////////<!----- JS  FLIGHT/HOTEL ---->////////
function CheckExteraHoteldate(element) {
  var isChecked = $(element).prop("checked");
  if (isChecked == true) {
    $(element).val(1);
    $(".check-hotel-date-container").show();
    $(".checkout").attr("required", true);
    $(".checkin").attr("required", true);
  } else if (isChecked == false) {
    $(element).val(0);
    $(".check-hotel-date-container").hide();
    $(".checkout").attr("required", false);
    $(".checkin").attr("required", false);
  }
}

if ($(".Hotel-Date").val() == 1) {
  $(".check-hotel-date-container").show();
  $(".Hotel-Date").prop("checked", true);
} else {
  $(".check-hotel-date-container").hide();
  $(".Hotel-Date").prop("checked", false);
}
////////<!----- JS  DATEPICKER ---->////////
function getPassportExpiryDate() {
  return new Date();
}
var regional = "",
  isJalali = !1;
if (regional == "fa") {
  isJalali = !0;
}
$(".datepicker").focus(function (e) {
  FDatepicker(this, {
    single: !0,
    isJalali: isJalali,
    changeMonth: !0,
    changeYear: !0,
    minDate: "-100y",
    maxDate: $("#AdaultMaxDate").val(),
    yearRangeJalali: "1250:1500",
    yearRangeGregorian: "1900:2030",
    numberOfMonths: 1,
  });
  var innerContent = $(".nice-select > ul");
  var option_height = $(".nice-select .option").height();
  var option_count = $(".nice-select .option").length;
  var Ul_height = parseInt(option_height) * parseInt(option_count);
  innerContent.scrollTop(Ul_height / 2);
});
PersianDate = {
  g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
};
PersianDate.PersianToGregorian = function (j_y, j_m, j_d) {
  j_y = parseInt(j_y);
  j_m = parseInt(j_m);
  j_d = parseInt(j_d);
  var jy = j_y - 979;
  var jm = j_m - 1;
  var jd = j_d - 1;
  var j_day_no =
    365 * jy + parseInt(jy / 33) * 8 + parseInt(((jy % 33) + 3) / 4);
  for (var i = 0; i < jm; ++i) j_day_no += PersianDate.j_days_in_month[i];
  j_day_no += jd;
  var g_day_no = j_day_no + 79;
  var gy = 1600 + 400 * parseInt(g_day_no / 146097);
  g_day_no = g_day_no % 146097;
  var leap = !0;
  if (g_day_no >= 36525) {
    g_day_no--;
    gy += 100 * parseInt(g_day_no / 36524);
    g_day_no = g_day_no % 36524;
    if (g_day_no >= 365) g_day_no++;
    else leap = !1;
  }
  gy += 4 * parseInt(g_day_no / 1461);
  g_day_no %= 1461;
  if (g_day_no >= 366) {
    leap = !1;
    g_day_no--;
    gy += parseInt(g_day_no / 365);
    g_day_no = g_day_no % 365;
  }
  for (
    var i = 0;
    g_day_no >= PersianDate.g_days_in_month[i] + (i == 1 && leap);
    i++
  )
    g_day_no -= PersianDate.g_days_in_month[i] + (i == 1 && leap);
  var gm = i + 1;
  var gd = g_day_no + 1;
  gm = gm < 10 ? "0" + gm : gm;
  gd = gd < 10 ? "0" + gd : gd;
  return [gy, gm, gd];
};

////////<!----- JS  MULTICITY ---->////////
if ($(window).width() >= 1024) {
  $("#multi-flight")
    .find(".route-content")
    .each(function () {
      $(this).addClass("set_Date_Box");
    });
}

function showMultiCity(element) {
  $("#multi-flight").removeClass("unvisible");
  $("#flight_form").addClass("unvisible");

  $(element).addClass("active-flight-type");
  $("#oneway").removeClass("active-flight-type");
  $("#backtoback").removeClass("active-flight-type");
  $("#multi-flight").show();
  $(".amitflight").hide();

  if ($(window).width() <= 750) {
    $("#multi-flight").attr("action", "/M_MultiCity_Search.bc");
  }
}
const destination_nth_txt = ["مقصد اول", "مقصد دوم", "مقصد سوم", "مقصد چهارم"];
function addMulticityRoute(element) {
  if (
    document
      .querySelector(".route-container")
      .querySelectorAll(".route-content").length < 4
  ) {
    const appended_element = document
      .querySelector(".route-container")
      .querySelectorAll(".route-content")[0].innerHTML;
    const child = document.createElement("div");
    child.innerHTML = appended_element;

    if ($(window).width() >= 1024) {
      child.className = "w-full pb-4 border-t route-content border-neutral-200";
    } else {
      child.className = "w-full border-t route-content border-neutral-200";
    }
    child.querySelector(".multi-route-tlt").innerText =
      destination_nth_txt[
      document
        .querySelector(".route-container")
        .querySelectorAll(".route-content").length
      ];

    child.querySelectorAll("input").forEach((e) => {
      e.value = "";
    });

    child
      .querySelector(".multi-route-tlt")
      .insertAdjacentHTML(
        "afterend",
        `<span class="text-white bg-red-600 cursor-pointer hover:bg-error-500 font-danamedium px-1 rounded-md" onclick="deleteMulticityRoute(this)" > حذف مسیر  </span>`
      );

    if (child.querySelector(".gregorian_date")) {
      child.querySelector(".gregorian_date").remove();
    }

    document.querySelector(".route-container").append(child);
    child.setAttribute(
      "data-index",
      element
        .closest("form")
        .querySelector(".route-container")
        .querySelectorAll(".route-content").length
    );

    child.querySelector(".fromcity_container").querySelector(".FCD1").value =
      child.previousElementSibling
        .querySelector(".tocity_container")
        .querySelector(".FCD2").value;
    child
      .querySelector(".fromcity_container")
      .querySelector(".fromcity").value = child.previousElementSibling
        .querySelector(".tocity_container")
        .querySelector(".tocity").value;
    child.querySelector(".tocity_container").querySelector(".FCD2").value = "";
    child.querySelector(".tocity_container").querySelector(".tocity").value =
      "";
    child.querySelector(".Basis_Date_Box").querySelector(".start_date").value =
      "";
  }
  checkButtonAddCity();
}

function deleteMulticityRoute(element) {
  element.closest(".route-content").remove();
  let index = 0;
  document
    .querySelector("#multi-flight-form")
    .querySelector(".route-container")
    .querySelectorAll(".route-content")
    .forEach((e) => {
      e.querySelector(".multi-route-tlt").innerText =
        destination_nth_txt[index];
      index++;
      e.setAttribute("data-index", index);
    });
  checkButtonAddCity();
}

function checkButtonAddCity() {
  if (
    document
      .querySelector("#multi-flight-form")
      .querySelector(".route-container")
      .querySelectorAll(".route-content").length >= 4
  ) {
    document
      .getElementsByClassName("route-plus-btn")[0]
      .classList.add("group/deactive");
  } else {
    document
      .getElementsByClassName("route-plus-btn")[0]
      .classList.remove("group/deactive");
  }
}

function formMulticity_search_isSubmited(element, event) {
  let fdates = element.querySelectorAll("input[name=fdate]");
  let validation = true;
  fdates.forEach((e) => {
    if (e.value == "" && e.disabled == false) {
      event.preventDefault();
      validation = false;
      e.style.border = "1px solid #f42e36";
    }
  });

  if (validation) {
    let select_age = "";
    element
      .querySelector(".section-select-age")
      .querySelectorAll("select")
      .forEach((e) => {
        select_age = select_age + e.value + ",";
      });
    if (select_age !== "") {
      element.querySelector(".select-age-value").value = select_age;
      var val_1 = element.querySelector(".select-age-value").value;
      var val_2 = val_1.replace(/,(?=[^,]*$)/, "");
      element.querySelector(".select-age-value").value = val_2;
    } else {
      element.querySelector(".select-age-value").value = 0;
    }
    for (
      let i = 0;
      i < element.getElementsByClassName("route-content").length;
      i++
    ) {
      element
        .getElementsByClassName("route-content")
      [i].querySelector(".fromcity")
        .setAttribute("name", `_root.route__${i}.fromcity`);
      element
        .getElementsByClassName("route-content")
      [i].querySelector(".tocity")
        .setAttribute("name", `_root.route__${i}.tocity`);
      element
        .getElementsByClassName("route-content")
      [i].querySelector(".start_date")
        .setAttribute("name", `_root.route__${i}.departuredate`);
      element
        .getElementsByClassName("route-content")
      [i].querySelector(".fromcity-text")
        .setAttribute("name", `_root.route__${i}.fromcityName`);
      element
        .getElementsByClassName("route-content")
      [i].querySelector(".tocity-text")
        .setAttribute("name", `_root.route__${i}.tocityName`);
      element
        .getElementsByClassName("route-content")
      [i].querySelector(".multi-route-tlt")
        .insertAdjacentHTML(
          "beforeend",
          `<input type="hidden" value="${destination_nth_txt[i]}" name="_root.route__${i}.index"/>`
        );
    }
  }
}

function exchangeDepDes(element) {
  var dep = $(element).closest(".route-content").find(".FCD1").val(),
    des = $(element).closest(".route-content").find(".FCD2").val(),
    depid = $(element).closest(".route-content").find(".FCDid1").val(),
    desid = $(element).closest(".route-content").find(".FCDid2").val();

  $(element).closest(".route-content").find(".FCD1").val(des),
    $(element).closest(".route-content").find(".FCD2").val(dep),
    $(element).closest(".route-content").find(".FCDid1").val(desid),
    $(element).closest(".route-content").find(".FCDid2").val(depid);
}
////////<!----- JS  MULTICITY ---->////////


function changeParentBackground(bg) {
  const targetImage = document.querySelector("#banner-sb").querySelector("img");
  const currentSrc = targetImage.src;
  const updatedSrc = currentSrc.replace(/[^/]+$/, `${bg}`);
  targetImage.src = updatedSrc;
}




