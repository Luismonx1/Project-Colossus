import { createRoot } from 'react-dom/client';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import '../Styles/immersive.css';

const target = document.querySelector<HTMLElement>('.colossus-immersive');

if (target) {
  const { image, title, date, caption } = target.dataset;

  if (image && title) {
    createRoot(target).render(<ScrollExpandMedia
      mediaSrc={image}
      bgImageSrc={image}
      title={title}
      date={date}
      caption={caption}
      scrollToExpand="Role para despertar o gigante"
    />);
  }
}
