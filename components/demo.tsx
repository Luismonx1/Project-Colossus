"use client";
import ScrollExpandMedia from '@/components/ui/scroll-expansion-hero';
const media = {
  mediaSrc: '../Images/Colossos/Argus/ArgusCinematic.webp',
  bgImageSrc: '../Images/Colossos/Argus/ArgusCinematic.webp',
  title: 'Argus', date: 'Colosso XV · Terras Proibidas', scrollToExpand: 'Role para despertar o gigante',
};
export const ImageExpansion = () => <ScrollExpandMedia {...media} />;
export const ImageExpansionTextBlend = () => <ScrollExpandMedia {...media} textBlend />;
export default ImageExpansion;
