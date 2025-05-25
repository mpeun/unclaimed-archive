import ColorThief from 'colorthief';

export default async function getColors(imagePath) {
  const colorThief = new ColorThief();
  const palette = await colorThief.getPalette(imagePath, 5);
  return palette.map(rgb => `rgb(${rgb.join(',')})`);
}
