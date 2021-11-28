const counter = document.querySelector('.counter');
const final = document.querySelector('.final');
const replay = document.querySelector('#replay');
let nums = document.querySelectorAll('.nums span');
let listeners = [];

runAnimation();

function runAnimation() {

    nums.forEach ((num, idx) => {
        const nextToLast = nums.length - 1;

        function runner (e) {
            if (e.animationName === 'goIn' && idx !== nextToLast) {
                num.classList.remove ('in');
                num.classList.add ('out');
            } else if (e.animationName === 'goOut' && num.nextElementSibling) {
                num.nextElementSibling.classList.add ('in');
            } else {
                counter.classList.add ('hide');
                final.classList.add ('show');
                listeners.forEach(listener=> {
                    listener.el.removeEventListener('animationend', listener.runner);
                })
            }
        }

        listeners.push ({
            el: num,
            runner: runner,
        })
        num.addEventListener ('animationend', runner);
    })
}

function resetDOM (){
    counter.classList.remove('hide');
    final.classList.remove('show');
    nums.forEach(num => {
        num.removeAttribute('class');
    })
    nums[0].classList.add ('in');
}

replay.addEventListener('click', ()=> {
    listeners = [];
    runAnimation();
    resetDOM ();
})
