import {ReactNode, useEffect, useRef, useState } from 'react'
import { renderToString } from 'react-dom/server'
import './style.less'

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { BedroomParentOutlined } from '@mui/icons-material';
import CachedIcon from '@mui/icons-material/Cached';


interface XYPullUpProps {
	onTrigger: () => void
	children: ReactNode
}

export default function XYPullUp({
  // ref: React.RefObject<HTMLDivElement>,
  onTrigger,
	children
}: XYPullUpProps) {

	const TRIGGER_THRESHOLD = 100
	const SHOW_INDICATOR_THRESHOLD = 50

	const ref:React.RefObject<HTMLDivElement> = useRef(null)
	const [state, setState] = useState('waiting')


	async function handleTrigger(el: HTMLElement) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				try {
					onTrigger()
					resolve(true)
				} catch (err) {
					reject(err)
				} finally {
					// changeState('loading', 'waiting')
					setState('waiting')
					el.style.transform = 'translateY(0)'
				}
			}, 5000)
		})
	}

	function changeState(oldState: string, newState: string) {
		const el = ref.current as HTMLElement;
		const pullIndicator = el.parentNode!.querySelector(".xy-pull-indicator");
		if (pullIndicator && pullIndicator.classList.contains(oldState)) {
			pullIndicator.classList.replace(oldState, newState);
		}
	}

  useEffect(() => {
		// ref.current = document.querySelector('xy-pull-wrapper')
    const el = ref.current;
    if (!el) return;

		const MAX = 128;
		const k = 0.4;
		function appr(x: number) {
			return MAX * (1 - Math.exp((-k * x) / MAX));
		}

    // attach the event listener
    el.addEventListener("touchstart", handleTouchStart);

		const pl = el.parentNode as HTMLElement
		pl.addEventListener('scroll', scrollHandle)

		function scrollHandle(event: Event) {
			// const el = event.target as HTMLElement
			// console.log(el.scrollTop)
			// scrollRef.current = el.scrollTop
		}

    function handleTouchStart(startEvent: TouchEvent) {
      const el = ref.current;
      if (!el) return;

			const parentEl = el.parentNode as HTMLDivElement;
			// if (parentEl.scrollTop !== 0) { return; }

      // get the initial Y position
      const initialY = startEvent.touches[0].clientY;

      el.addEventListener("touchmove", handleTouchMove);
      el.addEventListener("touchend", handleTouchEnd);

      function handleTouchMove(moveEvent: TouchEvent) {
        const el = ref.current;
        if (!el) return;

        // get the current Y position
        const currentY = moveEvent.touches[0].clientY;

        // get the difference
        const dy = currentY - initialY;
				// if (dy < 0) return;
				if (dy > 0 && parentEl.scrollTop == 0) {
					// update the element's transform
					el.style.transform = `translateY(${appr(dy)}px)`;
					

					if (dy > TRIGGER_THRESHOLD) { // 100px
						// flip the arrow
						// flipArrow(parentEl);
						setState('flip')
					} else if (dy > SHOW_INDICATOR_THRESHOLD) { // 50px
						// add the arrow
						addPullIndicator(parentEl);
					} else {
						// remove the arrow
						setState('waiting')
						// removePullIndicator(parentEl);
					}

				} 
				// bottom
				else if (dy < 0 && parentEl.scrollTop + parentEl.clientHeight == parentEl.scrollHeight ) {
					el.style.transform = `translateY(${-appr(-dy)}px)`;
				}

			}

			function addPullIndicator(el: HTMLDivElement) {
				
			}
			
			// function removePullIndicator(el: HTMLDivElement) {
				// changeState('flip', 'waiting')
			// }
			


			// function flipArrow(el: HTMLDivElement) {
				// changeState('waiting', 'flip')
			// }

      async function handleTouchEnd(endEvent: TouchEvent) {
        const el = ref.current;
        if (!el) return;

				const y = endEvent.changedTouches[0].clientY;
				const dy = y - initialY;
				const pl = el.parentNode as HTMLDivElement;
				
				if (dy < TRIGGER_THRESHOLD) {
					el.style.transform = `translateY(0px)`;
					el.style.transition = "transform 0.2s";

					changeState('flip', 'waiting')
				}
				// run the callback
				if (dy > TRIGGER_THRESHOLD && pl.scrollTop == 0) {
					// return the element to its initial position
					el.style.transform = `translateY(25px)`;
					// add transition
					el.style.transition = "transform 0.2s";
					// el.classList.add('.pull-loading')
			

					// loading mark
					// changeState('flip', 'loading')
					setState('loading')


					// onTrigger();
					await handleTrigger(el)
				}

				 // listen for transition end event
				el.addEventListener("transitionend", onTransitionEnd);

        // cleanup
        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      }
    }

		function onTransitionEnd() {
			const el = ref.current;
			if (!el) return;

			// remove transition
			el.style.transition = "";

			// cleanup
			el.removeEventListener("transitionend", onTransitionEnd);
		}

    return () => {
      // don't forget to cleanup
      el.removeEventListener("touchstart", handleTouchStart);

			pl.removeEventListener('scroll', scrollHandle)
    };
  }, [ref.current]);

	return (
	<>
		<div className='xy-pull-wrapper'>
			<div className={`xy-pull-indicator ${state}`}>
					<div className='xy-arrow-down'>
						<ArrowDownwardIcon />下拉刷新
					</div>
					<div className='xy-loading'>
						<CachedIcon /> 加载中...
					</div>
			</div>
			<div className='xy-pull-content' ref={ref}>
				{children}
			</div>
		</div>
	</>
	)
}