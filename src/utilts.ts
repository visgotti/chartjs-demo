import { MONTH_LABELS, BACKGROUND_COLORS } from "./constants";

export function generateRandomData(numPoints: number): { x: number, y: number }[] {
  const data: { x: number, y: number }[] = [];

  for (let i = 0; i < numPoints; i++) {
      const randomX = Math.random() * 100; 
      const randomY = Math.random() * 100; 
      data.push({ x: randomX, y: randomY });
  }
  return data;
}

export function generateRandomNumbers(numPoints: number, min: number, max:number): number [] {
  const data: number[] = [];
  for (let i = 0; i < numPoints; i++) {
      data.push(generateRandomNumber(min, max));
  }
  return data;
}

export function generateRandomNumber(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function createChartData (data: number[], borderColor?: string) {
  return {
    labels: MONTH_LABELS,
    datasets: [{ 
      data,
      backgroundColor: BACKGROUND_COLORS,
      borderColor,
    }]
  }
}