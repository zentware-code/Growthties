$(document).ready(function () {
    displayPics();
});

function displayPics() {
    var imagesArray = [
        "../Content/assets/img/pages/Esd_Banners 01-01.jpg",
        "../Content/assets/img/pages/Esd_Banners 01-02.jpg",
        "../Content/assets/img/pages/Esd_Banners 01-03.jpg",
        "../Content/assets/img/pages/Esd_Banners 01-04.jpg",
        "../Content/assets/img/pages/Esd_Banners 01-05.jpg",
        "../Content/assets/img/pages/Esd_Banners 01-06.jpg",
        "../Content/assets/img/pages/Esd_Banners 01-07.jpg",
    ];

    // Generate a random index
    var num = Math.floor(Math.random() * imagesArray.length);

    // Get the random image from the array
    var img = imagesArray[num];

    // Set the image source in the <img> tag with id="picture"
    $("#picture").attr("src", img);
}

