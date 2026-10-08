import { createRoot } from 'react-dom/client';
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
import '../Styles/immersive.css';
const target = document.getElementById('argus-immersive');
if (target) createRoot(target).render(<ScrollExpandMedia
  mediaSrc="../Images/Colossos/Argus/ArgusCinematic.webp"
  bgImageSrc="../Images/Colossos/Argus/ArgusCinematic.webp"
  title="Argus"
  date="Colosso XV · Terras Proibidas"
  scrollToExpand="Role para despertar o gigante"
/>);
