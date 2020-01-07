$(function () {

    console.log('start')
    $('.gopher').offset({ top: 300, left: 30 });
    // setTimeout(function () { GoGopher('.gopher', '300px') }, 1000);
    JumpGopher('.gopher', true)
});

function GoGopher(id, move, t) {
    pos = $(id).offset();
    $(id).animate({
        'left': (move + pos.left) + 'px'
    }, {
            'duration': t,
            'delay': 100,
            'complete': function () {

                if (pos.left > $(window).width()) {
                    console.log('end')
                    return
                }

                JumpGopher(id, false);
            }
        });
}

function JumpGopher(id, flag) {
    pos = $(id).offset();
    abs = flag ? 1 : -1;
    move = 70;
    t = 1000;
    $(id).animate({
        'left': (abs * move / 2 + pos.left) + 'px',
        'top': (pos.top - 100) + 'px',
    }, {
            'duration': t / 2,
            'delay': 0,
        }).animate({
            'left': (abs * move + pos.left) + 'px',
            'top': (pos.top - 56) + 'px',
        }, {
                'duration': t / 2,
                'delay': 50,
                'complete': function () {

                    if (pos.left > $(window).width()) {
                        console.log('end')
                        return
                    }

                    GoGopher(id, 200, 2000);
                }
            });
}