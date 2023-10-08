import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type VisibleItem = {
  top: number;
  left: number;
  width: number;
  height: number;
  elem: HTMLElement;
  setVisible: (visible: boolean) => void;
};

let left = window.scrollX;
let top = window.scrollY;
let width = window.innerWidth;
let height = window.innerHeight;

const items: VisibleItem[] = [];

const VisibleContext = createContext(false);

function resetItems() {
  for (const item of items) {
    item.top = item.elem.offsetTop;
    item.left = item.elem.offsetLeft;
    item.width = item.elem.offsetWidth;
    item.height = item.elem.offsetHeight;
  }

  items.sort((a, b) => a.top - b.top);
}

function triggerVisibleItems() {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (item.top > top + height) {
      break;
    } else if (
      item.top + item.height >= top &&
      item.left + item.width >= left &&
      item.left <= left + width
    ) {
      item.setVisible(true);
    }
  }
}

function scrollListener() {
  left = window.scrollX;
  top = window.scrollY;

  triggerVisibleItems();
}

function resizeListener() {
  left = window.scrollX;
  top = window.scrollY;
  width = window.innerWidth;
  height = window.innerHeight;

  resetItems();
  triggerVisibleItems();
}

export const VisibleListener: FunctionComponent<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    left = window.scrollX;
    top = window.scrollY;
    width = window.innerWidth;
    height = window.innerHeight;

    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return children;
};

export type VisibleProviderProps = PropsWithChildren<{
  elem: HTMLElement | null;
}>;

export const VisibleProvider: FunctionComponent<VisibleProviderProps> = ({ elem, children }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (elem && !visible) {
      const item: VisibleItem = {
        top: elem.offsetTop,
        left: elem.offsetLeft,
        width: elem.offsetWidth,
        height: elem.offsetHeight,
        elem,
        setVisible,
      };

      if (
        item.top + item.height >= top &&
        item.top < top + height &&
        item.left + item.width >= left &&
        item.left < left + width
      ) {
        setVisible(true);
      } else {
        const index = items.findIndex((i) => i.top > item.top);

        if (index === -1) {
          items.push(item);
        } else {
          items.splice(index, 0, item);
        }

        return () => {
          items.splice(
            items.findIndex((i) => i === item),
            1,
          );
        };
      }
    }
  }, [elem, visible]);

  return <VisibleContext.Provider value={visible}>{children}</VisibleContext.Provider>;
};

export function useIsVisible(): boolean {
  return useContext(VisibleContext);
}
