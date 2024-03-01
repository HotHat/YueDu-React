import { MutableRefObject, useEffect, useState } from 'react';

interface IContainerScrollOption {
  /** 距离底部多少距离触发触底 */
  safeBottomHeight: number;
}

interface IContainerScrollState {
  /** 滚动条横向高度 */
  scrollLeft: number;
  /** 滚动条高度 */
  scrollTop: number;
  /** 是否触底 */
  reachBottom: boolean;
  setReachBottom: (v: boolean) => void;
  /** scroll to top */
  scrollToTop: () => void;
  /** scroll to left */
  scrollToLeft: () => void;
}

/**
 * 获取dom对应的scrollLeft & scrollTop
 * @param container Ref<HTMLElement> | string 容器（不传，默认body）
 * @param options 额外配置参数
 * @returns scrollState IContainerScrollState
 */
export default function useContainerScroll(
  container: MutableRefObject<HTMLElement> | string,
  options?: IContainerScrollOption,
) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [reachBottom, setReachBottom] = useState(false);
  const { safeBottomHeight = 50 } = options || {};

  function getContainer() {
    let theContainer: HTMLElement|null = null;
    if (container && (container as MutableRefObject<HTMLDivElement>).current) {
      theContainer = (container as MutableRefObject<HTMLDivElement>).current;
    }
    if (container && typeof container === 'string') {
      theContainer = document.querySelector(container);
    }
    return theContainer || document.body;
  }

  function onScroll() {
    const theContainer = getContainer();
    setX(theContainer.scrollLeft);
    setY(theContainer.scrollTop);
    setReachBottom(theContainer.scrollTop + theContainer.offsetHeight >= theContainer.scrollHeight - safeBottomHeight);
  }

  function resetScroll(type: 'top' | 'left' = 'top') {
    const theContainer = getContainer();
    const scrollKey = type === 'left' ? 'scrollLeft' : 'scrollTop';
    let timer:any;

    const step = () => {
      theContainer[scrollKey] -= 130;

      if (theContainer[scrollKey] > 0) {
        timer = window.requestAnimationFrame(step);
      } else {
        window.cancelAnimationFrame(timer);
      }
    };

    timer = window.requestAnimationFrame(step);
  }

  useEffect(() => {
    const theContainer = getContainer();
    theContainer.addEventListener('scroll', onScroll);

    return () => {
      theContainer.removeEventListener('scroll', onScroll);
    };
  }, []);

  return {
    scrollLeft: x,
    scrollTop: y,
    reachBottom,
		setReachBottom,
    scrollToTop: () => {
      resetScroll('top');
    },
    scrollToLeft: () => {
      resetScroll('left');
    },
  } as IContainerScrollState;
}