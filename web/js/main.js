$(function () {

    console.log('start')
    setTimeout(function () { GoRight('.gopher') }, 1000);

});

function GoRight(id) {
    $(id).animate({
        'right': '500px'
    }, {
            'duration': 3000,
            'complete': function () {

                // pos = $('.gopher').offset();
                // console.log('pos ' + pos.left + ' window ' + $(window).width())
                // if (pos.left > $(window).width()) {
                //     return
                // }

                console.log('go left')
                setTimeout(function () { GoLeft(id) }, 1000);
            }
        });
}

function GoLeft(id) {
    $(id).animate({
        'left': '100px'
    }, {
            'duration': 2000,
            'complete': function () {
                console.log('go right')
                setTimeout(function () { GoRight(id) }, 1000);
            }
        });
}