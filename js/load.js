document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
	ScrollTrigger.refresh();

	document.documentElement.style.overflow = 'hidden';
	document.body.style.overflow = 'hidden';
	window.scrollTo(0, 0);

	loadAnimation();
});

// 페이지 새로고침 직전에 실행
window.onbeforeunload = function () {
	window.scrollTo(0, 0);
};

function loadAnimation() {
	const load = document.querySelector('#load_wrap');
	const video1 = document.querySelector('#video1_wrap');

	document.documentElement.style.visibility = 'hidden';

	startLoadAnimation();

	function startLoadAnimation() {
		document.querySelector('#load_wrap').style.visibility = 'visible';

		gsap.set(load, { scale: 0.1 });

		// 로고 애니메이션
		gsap.from(load, {
			clipPath: 'inset(0 100% 0 0)',
			opacity: 0,
			duration: 2,
			ease: 'power1.out',
			onComplete: loadScale
		});
	}

	function loadScale() {
		gsap.set(video1, { display: 'block' });

		gsap.to(load, {
			scale: 1,
			duration: 2,
			ease: 'power1.out',
			onStart: () => {
				gsap.to(video1, {
					opacity: 1,
					maskSize: 'contain',
					duration: 2,
					delay: 0.2
				});
			},
			onComplete: completeAnimation
		});
	}
}

function completeAnimation() {
	// 로딩 완료 후 처리
	setTimeout(() => {
		document.documentElement.style.visibility = 'visible';
		document.body.style.overflow = '';
	}, 500);

	const loadComplete = new Event('loadComplete');
	window.dispatchEvent(loadComplete);
}
