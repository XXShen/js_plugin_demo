$(document).ready(function() {
    var $tableCarousel = $('.table-carousel-wrap .carousel');
    var $navCarousel = $('.nav-carousel-wrap .carousel');
    $tableCarousel.jcarousel({
        vertical: true
    });
    $('.table-content-nav li').click(function() {
        var index = $(this).index();
        $tableCarousel.data('jcarousel').scroll(index);
    });
});
