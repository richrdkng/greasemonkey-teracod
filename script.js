// ==UserScript==
// @include     *//teracod.org*
// ==/UserScript==

// hide site until the script finished
document.getElementsByTagName('body')[0].style.display = 'none';

(function($) {

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
                href           = nameRow.find('a[href*="/download"]').eq(0).attr('href'),
                downloadButton = $('<a/>', {
                    href  : href,
                    title : href,
                    css   : {
                        position : 'absolute',
                        top      : '4px',
                        left     : '3px'
                    }
                }).append($('<img/>', {
                    src : 'data:image/png;base64,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',
                    css : {
                        height : '32px'
                    }
                }));

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