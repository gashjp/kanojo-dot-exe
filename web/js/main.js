$(function () {

    console.log('start')
    height = $(window).height();
    $('.gopher').offset({ top: height - 250, left: 30 });
    // setTimeout(function () { GoGopher('.gopher', '300px') }, 1000);
    pos = $('.gopher').offset();
    console.log('default at ', pos.top)
    JumpGopher('.gopher', true)
});

function GoGopher(id, move, t) {
    pos = $(id).offset();
    $(id).animate({
        'left': (move + pos.left) + 'px'
    }, {
            'duration': t,
            'easing': 'swing',
            'delay': 100,
            'complete': function () {
                randomAction(id);
            }
        });
}

function JumpGopher(id, flag) {

    function jump(id, pos, x, abs) {
        y = getHeight(x)
        if (y < 0) {
            y = 0;
        }
        $(id).animate({
            'left': (abs * x + pos.left) + 'px',
            'top': (pos.top - y) + 'px',
        }, {
                'duration': 1000 / 35,
                'delay': 0,
                'complete': function () {
                    p = $(id).offset();
                    console.log('p ' + p.top)
                    if (x > 66) {
                        endJump(id, pos, abs)
                        return
                    }
                    jump(id, pos, x + 2, abs)
                }
            });
    }

    function endJump(id, pos, abs) {
        $(id).animate({
            'left': (abs * 70 + pos.left) + 'px',
            'top': (pos.top - 55) + 'px',
        }, {
                'duration': 1000 / 35,
                'delay': 0,
                'complete': function () {
                    p = $(id).offset();
                    randomAction(id);
                    return
                }
            });
    }

    function getHeight(x) {
        y = - 8 / 49 * (x - 35) * (x - 35) + 190;
        // console.log('x,y = ' + x + ',' + y);
        return y;
    }

    pos = $(id).offset();
    abs = flag ? 1 : -1;
    console.log('jump at ', pos.top)
    jump(id, pos, 0, abs);
}

function talkGopher(id) {
    $(".gopher").css('animation-play-state', 'paused')
    $(".hukidasi-text").text("hello jquery");
    $(".hukidasi").toggle();
    setTimeout(function () {

        $(".hukidasi").toggle();
        $(".gopher").css('animation-play-state', 'running')
        randomAction(id)
    }, 3000);
}

function randomAction(id) {
    pos = $(id).offset()
    if (pos.left > $(window).width()) {
        console.log('end')
        return
    }
    var r = Math.round(Math.random() * 4);
    if (r == 0) {
        JumpGopher(id, true);
        return;
    } else if (r == 1) {
        JumpGopher(id, false);
        return;
    } else if (r == 2) {
        talkGopher(id);
        return;
    } else {
        GoGopher(id, 200, 2000);
        return;
    }
}
