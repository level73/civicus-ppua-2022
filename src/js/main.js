/** Main JS Works for PPUA report **/

var PPUA = {

    init: function(){
        this.bodyShow();
        this.loadNav();
        this.loadFoot();
        this.headerBG();
        this.homepageMap();
        $('map').imageMapResize();
    },

    loadNav: function(){
        $('#main-navigation').load('partials/navigation.html');
    },

    loadFoot: function(){
        $('#page-footer').load('partials/footer.html', function(){
            $('[data-toggle="tooltip"]').tooltip();

        });
    },

    homepageMap: function(){
        $('.map-region').hover(
            function(){
                var theBG = $(this).data('bg');
                $('#main-map').addClass(theBG);
            },
            function(){
                var theBG = $(this).data('bg');
                $('#main-map').removeClass(theBG);
            }
        );

    },



    headerBG: function(){
        var bg_img = $('#main-header').data('bg');
        $('#main-header').css('background-image', 'url(assets/images/' + bg_img);
    },

    bodyShow: function(){
        $(window).on('load', function(){
            $('body#homepage').css('display', 'block');
        });

    },

};


$(document).ready(function(){
    PPUA.init();
});