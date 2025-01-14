document.addEventListener('DOMContentLoaded', () => {
	wheel();
	miniAnimation();
});

// 휠 애니메이션 (100vh)
function wheel() {
	let isScrolling = false;
	const footerHeight = 250; // 푸터 높이

	function handleWheel(event) {
		event.preventDefault();

		if (isScrolling) return;

		const direction = event.deltaY > 0 ? 1 : -1;
		const currentScroll = window.scrollY;
		const documentHeight = document.documentElement.scrollHeight;
		const windowHeight = window.innerHeight;
		let scrollAmount;

		// 문서 최하단 여부 확인
		const isFooter = Math.ceil(currentScroll + windowHeight) >= documentHeight;

		if (isFooter && direction === -1) {
			// 최하단에서 위로 스크롤할 때는 푸터 높이만큼만 이동
			scrollAmount = currentScroll - footerHeight;
		} else {
			// 그 외의 경우는 100vh 단위로 이동
			scrollAmount = currentScroll + windowHeight * direction;
		}

		isScrolling = true;

		gsap.to(window, {
			scrollTo: scrollAmount,
			duration: 1,
			ease: 'power2.inOut',
			onComplete: () => {
				isScrolling = false;
			}
		});
	}

	window.addEventListener('wheel', handleWheel, { passive: false });
}

// 리사이즈 이벤트 핸들러 추가
window.addEventListener('resize', () => {
	// ScrollTrigger 새로고침
	ScrollTrigger.refresh();
});

function miniAnimation() {
	// 로드 애니메이션 완료 이벤트 리스너
	window.addEventListener('loadComplete', () => {
		loadVideo();
		historyEvent();
		historyYear();
		newCooper();
		newVideo();
		newBlackRed();
		newClubman();
		newFamily();
		new5door();
		newIntro();
		newDetail();
		slogan();
		JCW();
	});
}

function loadVideo() {
	const load = document.querySelector('#load_wrap');
	const logo = document.querySelector('#logo');
	const mi = document.querySelector('#logo_mi');
	const ni = document.querySelector('#logo_ni');
	const video1 = document.querySelector('#video1_wrap');

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: load,
			start: 'top top',
			end: '+=400%',
			scrub: 1,
			pin: true
		}
	});

	tl.to(logo, { scale: 5, ease: 'power2.inOut', duration: 3 }, '<0.4')
		.to(video1, { maskSize: '400%', ease: 'power2.inOut', duration: 3 }, '<')
		.to(mi, { x: -2000, scale: 3, ease: 'power2.inOut', duration: 3 }, '<')
		.to(ni, { x: 2000, scale: 3, ease: 'power2.inOut', duration: 3 }, '<');
}

function createBlind(progress, hide, show) {
	const stripes = 12; // 막대 개수
	const gradients = [];

	for (let i = 0; i < stripes; i++) {
		// 각 막대의 시작 위치top)를 퍼센트로 계산
		// 예: 30개 막대일 경우, 0%, 3.33%, 6.67%, ... 형태로 균등 분배
		const startY = (i * 100) / stripes;

		// 각 막대의 끝 위치(bottom)를 퍼센트로 계산
		// 예: 3.33%, 6.67%, 10%, ... 형태로 균등 분배
		const endY = ((i + 1) * 100) / stripes;

		// progress에 따라 패턴 변화
		// progress(0~1)에 따라 transparent 영역의 너비 계산
		// progress가 0일 때: transparent 영역이 없음 (이미지 완전히 보임)
		// progress가 1일 때: transparent 영역이 최대 (이미지 완전히 가려짐)
		const maskHeight = progress * (endY - startY);

		gradients.push(`
					${hide} ${startY}%,
					${hide} ${startY + maskHeight}%,
					${show} ${startY + maskHeight}%,
					${show} ${endY}%
			`);
	}

	// 모든 막대의 그라디언트를 하나의 문자열로 합침
	return gradients.join(',');
}

function historyEvent() {
	const historyWrap = document.querySelector('#history_wrap');
	const history1 = document.querySelector('#history1');
	const history2 = document.querySelector('#history2');
	const historyList = document.querySelectorAll('#history_list > li');
	const light = document.querySelector('#light');
	const history3 = document.querySelector('#history3');
	const history3Title = document.querySelectorAll('.history3_title');
	const history3Text = document.querySelector('.history3_text');
	const history3Img = document.querySelectorAll('#history3_img > img');

	gsap.set(historyWrap, { display: 'block' });

	// 첫 번째 타임라인 - mask 애니메이션
	const tlMask = gsap.timeline({
		scrollTrigger: {
			trigger: historyWrap,
			start: 'top top',
			end: '+=100%',
			scrub: 2
		}
	});

	tlMask
		.to(history1, { opacity: 0, onUpdate: history1Mask }, '<')
		.to(history2, { opacity: 1, onUpdate: history2Mask }, '<');

	// 두 번째 타임라인 - 나머지 애니메이션
	const tlMain = gsap.timeline({
		scrollTrigger: {
			trigger: historyWrap,
			start: 'top top',
			end: '+=600%',
			pin: true,
			scrub: 1,
			invalidateOnRefresh: true
		},
		defaults: {
			duration: 1
		}
	});

	tlMain
		.to(historyList[0], { opacity: 1 }, '<1')
		.to(light, { opacity: 1 }, '<')
		.to(light, {
			opacity: 1,
			left: () => `${historyList[1].offsetLeft}`,
			top: '60%'
		})
		.to(historyList[1], { opacity: 1 }, '<')
		.to(light, {
			opacity: 1,
			left: () => `${historyList[2].offsetLeft}`,
			top: '12%'
		})
		.to(historyList[2], { opacity: 1 }, '<')
		.to(light, {
			opacity: 1,
			left: () => `${historyList[3].offsetLeft}`,
			top: '60%'
		})
		.to(historyList[3], { opacity: 1 }, '<')
		.to(history2, { filter: 'blur(10px)', opacity: 0.5 })
		.to(light, { opacity: 0 }, '<')
		.set(history3, { display: 'flex' }, '<')
		.fromTo(
			history3Title,
			{ clipPath: 'inset(0 100% 0 0)' },
			{
				clipPath: 'inset(0 0% 0 0)',
				duration: 0.7,
				stagger: {
					amount: 0.3,
					from: 'start'
				}
			},
			'<'
		)
		.fromTo(history3Text, { y: 500, opacity: 0 }, { y: 0, opacity: 1 }, '<')
		.set(history3Img, { display: 'block' }, '<')
		.to(
			history3Img,
			{ opacity: 1, ease: 'power2.inOut', onComplete: hoverImg },
			'<'
		);

	function hoverImg() {
		history3Img.forEach((item, index) => {
			const rotateImg = index === 0 ? 8 : index === 1 ? 4 : 0;

			setTimeout(() => {
				item.addEventListener('mouseenter', () => {
					gsap.set(item, { zIndex: 10 });
					gsap.to(item, {
						scale: 1.2,
						rotate: 0,
						duration: 0.3,
						filter: 'brightness(1)'
					});
				});
				item.addEventListener('mouseleave', () => {
					gsap.set(item, { zIndex: 1 });
					gsap.to(item, {
						scale: 1,
						rotate: rotateImg,
						duration: 0.3,
						filter: 'brightness(0.7)'
					});
				});
			}, 1000);
		});
	}

	function history1Mask() {
		const progress = this.progress();
		const easeProgress = gsap.parseEase('power2.inOut')(progress);
		const newMask = createBlind(easeProgress, 'transparent', 'black');
		history1.style.webkitMaskImage = `linear-gradient(-45deg, ${newMask})`;
		history1.style.maskImage = `linear-gradient(-45deg, ${newMask})`;
	}

	function history2Mask() {
		const progress = this.progress();
		const easeProgress = gsap.parseEase('power2.inOut')(progress);
		const newMask = createBlind(easeProgress, 'black', 'transparent');
		history2.style.webkitMaskImage = `linear-gradient(45deg, ${newMask})`;
		history2.style.maskImage = `linear-gradient(45deg, ${newMask})`;
	}
}

function historyYear() {
	const history4 = document.querySelector('#history4');
	const yearList = document.querySelectorAll('.year_list');
	const lineY = document.querySelectorAll('.year_line_y');
	const lineX = document.querySelectorAll('#year_line_x');
	const textWrap = document.querySelectorAll('.year_text_wrap');

	yearList.forEach((item, index) => {
		//보정값 = (마지막 요소가 도달해야 하는 위치값 = 90% - 첫 요소 시작점 = 10%) * (요소 개수 = 11 / (요소 개수 - 1 = 10))
		item.style.left = `${index * (88 / 11) + 10}%`;
	});

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: history4,
			start: 'top top',
			end: '+=100%',
			scrub: 2,
			pin: true
		}
	});

	tl.from(lineX, {
		clipPath: 'inset(0 100% 0 0)',
		opacity: 0,
		duration: 1
	})
		.to(
			lineY,
			{
				clipPath: 'inset(0% 0 0% 0)',
				opacity: 1,
				stagger: {
					amount: 1, // 전체 stagger 시간을 1초로 설정
					from: 'start' // 첫 번째 요소부터 시작
				},
				ease: 'power1.inOut'
			},
			'<'
		)
		.to(
			textWrap,
			{
				clipPath: 'inset(0% 0 0% 0)',
				opacity: 1,
				stagger: {
					amount: 1, // 전체 stagger 시간을 1초로 설정
					from: 'start' // 첫 번째 요소부터 시작
				},
				ease: 'power1.inOut'
			},
			'<'
		);
}

function newCooper() {
	const newCooper = document.querySelector('#new_cooper');
	const newCooperName = document.querySelector('#new_cooper_name');
	const newCooperValue = document.querySelector('#new_list_value');
	const lastValue = newCooperValue.children[0];
	const newValue = newCooperValue.children[1];
	const newCooperImg = document.querySelector('#new_cooper_img').children[1];

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: newCooper,
			start: '0% 0%',
			end: '+=100%',
			scrub: 2,
			pin: true
		}
	});

	tl.to(newCooperName, { innerHTML: 'MINI COOPER S (1964)' }, '<')
		.from(newCooperImg, { clipPath: 'inset(0 100% 0 0)', duration: 1 })
		.to(
			newCooperName,
			{
				innerHTML: 'MINI COOPER S (2024)',
				modifiers: {
					innerHTML: (value) => {
						const randomNum = gsap.utils.random(1964, 2024, 1);
						return `MINI COOPER S (${randomNum})`;
					}
				},
				ease: 'power1.inOut'
			},
			'<'
		)
		.to(lastValue, { clipPath: 'inset(0 100% 0 0)', ease: 'power1.inOut' }, '<')
		.set(newCooperName, { innerHTML: 'MINI COOPER S (2024)' }, '>')
		.from(
			newValue,
			{ clipPath: 'inset(0 100% 0 0)', ease: 'power1.inOut' },
			'<'
		);
}

function newVideo() {
	const video = document.querySelector('#new_cooper_video');
	let hasEnded = false;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				// 완전히 화면에서 벗어났다가 들어올 때만 재생되도록 수정
				if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
					hasEnded = false;
					video.style.transition = 'opacity 1s';
					video.style.opacity = '1';
					video.currentTime = 0;
					video.play();
				} else {
					video.pause();
					video.style.opacity = '0';
				}
			});
		},
		{
			threshold: [0, 0.5, 1] // 여러 임계값 설정
		}
	);

	video.addEventListener('ended', () => {
		hasEnded = true;
		video.style.transition = 'opacity 1s';
		video.style.opacity = '0';
	});

	observer.observe(video);
}

function newBlackRed() {
	const newMini = document.querySelector('#new_mini');
	const blackMask = document.querySelector('#new_black');
	const redMask = document.querySelector('#new_red');

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: newMini,
			start: '0% 0%',
			end: `+=400%`,
			scrub: 1,
			pin: true
		}
	});

	tl.from(newMini, { opacity: 0, duration: 1 }, '<1')
		.to(redMask, { clipPath: 'inset(0% 0 0 0)', duration: 1 })
		.set(blackMask, { opacity: 0 })
		.to(redMask, { duration: 1, onUpdate: newBlind1 });

	function newBlind1() {
		const progress = this.progress();
		const easeProgress = gsap.parseEase('power2.inOut')(progress);
		const newBlind = createBlind(easeProgress, 'transparent', 'black');
		redMask.style.webkitMaskImage = `linear-gradient(to left, ${newBlind})`;
		redMask.style.maskImage = `linear-gradient(to left, ${newBlind})`;
	}
}

function newClubman() {
	const newTrigger = document.querySelector('#new_clubman_container');
	const newClubmanBg = document.querySelector('#new_clubman_bg');
	const newClubmanText = document.querySelector('#new_clubman_text_wrap');
	const newClubman = document.querySelector('#new_clubman');

	let endX = newClubman.scrollWidth;

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: newTrigger,
			start: '0% 0%',
			end: `+=1000%`,
			scrub: 2,
			pin: true,
			invalidateOnRefresh: true
		},
		defaults: {
			duration: 1
		}
	});

	// 순차적 실행을 위해 타임라인에 추가

	tl.fromTo(
		newClubmanBg,
		{ filter: 'blur(0px) brightness(0.8)' },
		{ filter: 'blur(8px) brightness(0.6)' },
		'<1'
	)
		.fromTo(
			newClubmanText,
			{ opacity: 0, top: '70%' },
			{ opacity: 1, top: '50%' },
			'<'
		)
		.to(newClubmanText, { opacity: 0, x: -2000 })
		.to(newClubman, { x: () => -endX, duration: 7, ease: 'none' }, '<') //clubman 스크롤 영역 늘림
		.to(newClubmanBg, { filter: 'blur(0px) brightness(1)' }, '<6') //bg blur 사라짐
		.to(newClubmanBg, { onUpdate: newBlind2 })
		.set('#new_mini_family_bg', { display: 'block' }, '<');

	function newBlind2() {
		const progress = this.progress();
		const easeProgress = gsap.parseEase('power2.inOut')(progress);
		const newBlind = createBlind(easeProgress, 'transparent', 'black');
		newClubmanBg.style.webkitMaskImage = `linear-gradient(to right, ${newBlind})`;
		newClubmanBg.style.maskImage = `linear-gradient(to right, ${newBlind})`;
	}
}

function newFamily() {
	const newFamily = document.querySelector('#new_family');
	const newFamilyBg = document.querySelector('#new_mini_family_bg');
	const newFamilyText = document.querySelector('#new_mini_family_text_wrap');

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: newFamily,
			start: '0% 0%',
			end: `+=200%`,
			scrub: 1,
			pin: true
		}
	});

	tl.fromTo(
		newFamilyBg,
		{ filter: 'blur(0px) grayscale(0)' },
		{ filter: 'blur(8px) grayscale(0.3)' },
		'<1'
	).to(newFamilyText, { opacity: 1, top: '50%' }, '<');
}

function new5door() {
	const new5doorInfoWrap = document.querySelector('#new_5door_info_wrap');
	const new5doorTitle = document.querySelector('#new_5door_title_wrap');
	const new5doorText = document.querySelector('.new_5door_text');

	const new5 = gsap.timeline({
		scrollTrigger: {
			trigger: new5doorInfoWrap,
			start: '0% 0%',
			end: '+=100%',
			scrub: 1,
			pin: true
		}
	});

	new5
		.from(new5doorTitle, { clipPath: 'inset(0 100% 0 0)' })
		.from(new5doorText, { clipPath: 'inset(100% 0 0 0)', opacity: 0 }, '>');
}

function newIntro() {
	const newIntro = document.querySelectorAll('.new_5door_intro_wrap');
	const newIntroTitle = document.querySelectorAll('.new_5door_intro_title');
	const newIntroText = document.querySelectorAll('.new_5door_intro_text');
	const newIntroImg = document.querySelectorAll('.new_5door_intro_img');

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: newIntro[0],
			start: '0% 0%',
			end: '+=100%',
			scrub: 3,
			pin: true
		}
	});

	tl.from(newIntroTitle[0], {
		clipPath: 'inset(0 100% 0 0)',
		ease: 'power2.in'
	})
		.from(
			newIntroText[0],
			{ clipPath: 'inset(0 0 100% 0)', opacity: 0, ease: 'power2.in' },
			'<0.5'
		)
		.from(
			newIntroImg[0],
			{ clipPath: 'inset(0 100% 0 0)', opacity: 0, ease: 'power2.inOut' },
			'<0.5'
		);

	const tl2 = gsap.timeline({
		scrollTrigger: {
			trigger: newIntro[1],
			start: '0% 0%',
			end: '+=100%',
			scrub: 2,
			pin: true
		}
	});

	tl2
		.from(newIntroImg[1], {
			clipPath: 'inset(0 100% 0 0)',
			opacity: 0,
			duration: 1,
			ease: 'power2.inOut'
		})
		.from(
			newIntroTitle[1],
			{
				clipPath: 'inset(0 100% 0 0)',
				ease: 'power2.inOut',
				duration: 1
			},
			'<0.5'
		)
		.from(
			newIntroText[1],
			{ clipPath: 'inset(0 0 100% 0)', opacity: 0, ease: 'power2.inOut' },
			'<0.5'
		);
}

function newDetail() {
	const detailImg = document.querySelectorAll('.new_5door_detail_list>li>img');

	detailImg.forEach((img) => {
		img.addEventListener('mouseenter', showDetail);
		img.addEventListener('mouseleave', stopShowDetail);
	});

	function showDetail() {
		gsap.to(this, { duration: 0.3, ease: 'power1.out', scale: 1.2 });
	}
	function stopShowDetail() {
		gsap.to(this, { duration: 0.3, ease: 'power1.out', scale: 1 });
	}
}

function slogan() {
	const sloganHomeWrap = document.querySelector('#slogan_home_wrap');
	const sloganIsWrap = document.querySelector('#slogan_is_wrap');
	const sloganBigWrap = document.querySelector('#slogan_big_wrap');

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: sloganHomeWrap,
			start: 'top top',
			end: '+=200%',
			scrub: 2,
			pin: true
		}
	});

	// 기존 애니메이션들을 타임라인에 추가
	tl.to(sloganIsWrap, { clipPath: 'inset(0 100% 0 0)' }).to(sloganBigWrap, {
		clipPath: 'inset(0 0 100% 0)'
	});
}

function JCW() {
	const jcwBigWrap = document.querySelector('#jcw_big_wrap');
	const jcwWrap = document.querySelector('#jcw_wrap');
	const jcwMainText = document.querySelector('#jcw_main_text_wrap');
	const jcwBox = document.querySelectorAll('.jcw_detail_text_box');

	gsap.utils.toArray(jcwBox).forEach((box) => {
		gsap.set(box.children, { opacity: 0, y: 100 });
	});

	let endX = window.innerWidth * 5;

	window.addEventListener('resize', () => {
		endX = window.innerWidth * 5;
	});

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: jcwBigWrap,
			start: 'top top',
			end: `+=600%`,
			scrub: 1,
			pin: true,
			invalidateOnRefresh: true,
			onUpdate: (self) => {
				// 각 box의 위치를 체크하고 애니메이션 실행
				gsap.utils.toArray(jcwBox).forEach((box) => {
					const boxLeft = box.getBoundingClientRect().left;
					if (boxLeft <= window.innerWidth * 0.2) {
						// 아직 애니메이션이 실행되지 않은 경우
						if (!box.animated) {
							gsap.to(box.children, {
								opacity: 1,
								y: 0,
								stagger: 0.1
							});
							box.animated = true;
						}
					} else if (boxLeft > window.innerWidth * 0.2 && box.animated) {
						// 역방향 스크롤 시 애니메이션 되돌리기
						gsap.to(box.children, {
							opacity: 0,
							y: 100,
							stagger: 0.1
						});
						box.animated = false;
					}
				});
			}
		}
	});

	tl.fromTo(jcwBigWrap, { opacity: 0 }, { opacity: 1, duration: 1 })
		.fromTo(
			jcwMainText.children,
			{ y: 500, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1 },
			'<'
		)
		.to(jcwWrap, { x: () => -endX, duration: 5, ease: 'none' }, '>');
}
