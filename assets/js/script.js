'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// photos variables
const photosItem = document.querySelectorAll("[data-photos-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalTime = document.querySelector("[data-modal-time]");

// modal toggle function
const photosModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

function addAllPhotos(data) {
  //var fs = require('fs');
  var path = "./assets/images/photography/";
  const dataArr = data.split(","); // yeah, album, num, ext
  var year = dataArr[0];
  var album = dataArr[1];
  var num = Number(dataArr[2]);
  var ext = dataArr[3];
  
  var item;
  var items = [];
  for(let i = 1; i <= num; i++) {
    // <figure class="photo-album-popup">
    //<img src="./assets/images/photography/2016/shadows/shadow-1.jpg" alt="window shadow" width=200>
    //</figure>
    item = '<figure class="photo-album-popup">' +
      '<img src="' + path + year + '/' + album + '/' + album + '-' + i.toString() + '.' + ext + '" alt="window shadow" width=200>' + 
      //'<img src="' + path + i + ext + '"></figure></div>' + 
      '</figure>';
    items.push(item);
  }
  $('.modal-img-wrapper').empty().append(items.join('\n'));
}

// add click event to all modal items
for (let i = 0; i < photosItem.length; i++) {

  photosItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-photos-avatar]").src;
    modalImg.alt = this.querySelector("[data-photos-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-photos-title]").innerHTML;
    modalTime.innerHTML = this.querySelector("[data-photos-time]").innerHTML;
    var data = this.querySelector("[data-photos-metadata]").innerHTML;  //yeah, album, num, ext
    addAllPhotos(data);
    photosModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", photosModalFunc);
overlay.addEventListener("click", photosModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
