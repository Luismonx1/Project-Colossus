import { createRoot } from 'react-dom/client';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import '../Styles/immersive.css';

const target = document.querySelector<HTMLElement>('.colossus-immersive');
const upperFocusColossi = new Set(['Valus', 'Gaius', 'Barba', 'Argus', 'Malus']);

if (target) {
  const { image, title, date, caption } = target.dataset;

  if (image && title) {
    createRoot(target).render(<ScrollExpandMedia
      mediaSrc={image}
      bgImageSrc={image}
      title={title}
      date={date}
      caption={caption}
      imagePosition={upperFocusColossi.has(title) ? 'center top' : 'center center'}
      scrollToExpand="Role para despertar o gigante"
    />);
  }
}
