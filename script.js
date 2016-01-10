// ==UserScript==
// @include     *//teracod.org*
// ==/UserScript==

// hide site until the script finished
document.getElementsByTagName('body')[0].style.display = 'none';

(function($) {

    /**
     * Returns the constructed download button with given parameters.
     *
     * @param {Object} options
     *
     * @return {jQuery}
     */
    function getDownloadButton(options) {
        var a   = $('<a/>'),
            img = $('<img/>', {
                src : 'https://cdn.rawgit.com/richrdkng/greasemonkey-teracod/master/img/arrow_square_green_16x16.png'
            }),
            opt,
            href;

        options = options || {};

        if (options.a) {
            opt = options.a;

            if (opt.href) {
                href = opt.href;
            }

            if (href) {
                a.attr('href',  href);
                a.attr('title', 'Download ' + href);
            }

            if (opt.class) {
                a.addClass(opt.class);
            }

            if (opt.css) {
                a.css(opt.css);
            }
        }

        if (options.img) {
            opt = options.img;

            if (opt.src) {
                img.attr('src', opt.src);
            }

            if (opt.css) {
                img.css(opt.css);
            }
        }

        return a.append(img);
    }

    $(function() {

        // remove site logo
        $('img[alt="logo"][src*="logo."]').remove();

        // tidy up the empty rows at the top ot the page
        $('#content .indent').css({'padding-top' : 0});
        $('nav.navbar').closest('.row').next().remove();

        // remove "top banner" and "middle banner"
        $('center, div').each(function() {
            var self = $(this);

            if (self.children('iframe').length > 0) {
                self.remove();
            }
        });

        // remove "top banner" from torrent page
        $('.indent').each(function() {
            $(this).find('a[href*="lanyok.hu"]').remove();
        });

        // add "download torrent" button to the front of each entry
        $('table.browse tr').each(function() {
            var self           = $(this),
                nameRow        = self.children('td').eq(1),
                downloadButton = getDownloadButton({
                    a : {
                        href  : nameRow.find('a[href*="/download"]').eq(0).attr('href'),
                        css   : {
                            position : 'absolute',
                            top      : '3px',
                            left     : '2px'
                        }
                    },
                    img : {
                        css : {
                            margin : '4px',
                            height : '28px'
                        }
                    }
                });

            nameRow.css({
                'position'     : 'relative',
                'padding-left' : '40px'
            });

            nameRow.prepend(downloadButton);
        });

        // show site after all the changes ran
        $('body').show();
    });

})(jQuery);