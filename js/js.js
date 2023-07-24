var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var bookmarkList;
var bookmarkExists;
if (localStorage.getItem("bookmarkList")) {
   bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
   displayBookmark(bookmarkList);
} else {
   bookmarkList = [];
}

function addBookmark() {
   if (validationSiteName() && validationSiteUrl()) {
      var bookmark = {
         name: capitalize(siteName.value),
         url: siteUrl.value,
      };
      bookmarkExists = false;
      for (var i = 0; i < bookmarkList.length; i++) {
         if (bookmarkList[i].name === bookmark.name) {
            bookmarkExists = true;
         }
      }
      if (!bookmarkExists) {
         bookmarkList.push(bookmark);
         displayBookmark(bookmarkList);
         localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
         clearForm();
      } else {
         swal({
            title: "Bookmark Already Exists",
            text: "A bookmark with the same name already exists. Please choose a different name.",
            icon: "warning",
            button: true,
         });
      }
   } else {
      swal({
         title: "Site Name or Url is not valid!",
         text: "Site name must contain at least 3 characters." +
            " \n " +
            "Site URL must be a valid one.",
         icon: "error",
         button: true,
      });
   }
}

function displayBookmark(list) {
   var cartona = "";
   for (var i = 0; i < list.length; i++) {
      cartona += ` <tr>
<th scope="row">${i + 1}</th>
<td>${list[i].name}</td>
<td><button type="button" class="btn btn-success"onclick="visitBookmark(${i})"><i class="fa fa-solid fa-eye"></i> Visit</td>
<td><button type="button" class="btn btn-danger"onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash"></i> Delete</td>
</tr>`;
   }
   document.getElementById("showData").innerHTML = cartona;
}
function capitalize(str) {
   if (typeof str !== "string");
   return str.charAt(0).toUpperCase() + str.slice(1);
}

function clearForm() {
   siteName.value = "";
   siteUrl.value = "";
}
function visitBookmark(index) {
   var url = bookmarkList[index].url;
   if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
   }
   window.open(url, 'url');
}
function deleteBookmark(index) {
   bookmarkList.splice(index, 1);
   localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
   displayBookmark(bookmarkList);
}
function validationSiteName() {
   var regex =/^\w{3,}((\s\w+)+)?$/;
   var nameError = document.getElementById("nameError");
   if (regex.test(siteName.value)) {
      siteName.classList.replace("is-invalid", "is-valid");
      return true;
   } else {
      siteName.classList.add("is-invalid");
      return false;
   }
}
function validationSiteUrl() {
   var regex = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
   var urlError = document.getElementById("urlError");
   if (regex.test(siteUrl.value)) {
      
      siteUrl.classList.replace("is-invalid", "is-valid");
      return true;
   } else {
      siteUrl.classList.add("is-invalid");
      return false;
   }
}