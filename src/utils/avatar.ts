export function hash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

export function getUnit(value: number, range: number, index: number = 0): number {
  return (value % range) / range;
}

export function getRandomColor(num: number, colors: string[], range: number): string {
  return colors[num % range];
}

export function generateColors(name: string, colors: string[]) {
  const numFromName = hash(name);
  const range = colors && colors.length;

  const elementsProperties = Array.from({ length: 3 }, (_, i) => ({
    color: getRandomColor(numFromName + i, colors, range),
    translateX: getUnit(numFromName * (i + 1), 40 / 10, 1),
    translateY: getUnit(numFromName * (i + 1), 40 / 10, 2),
    scale: 1.2 + getUnit(numFromName * (i + 1), 40 / 20) / 10,
    rotate: getUnit(numFromName * (i + 1), 360, 1),
  }));

  return elementsProperties;
}
