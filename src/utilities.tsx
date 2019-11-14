import { weatherSegment } from "./constants";
import { offset } from "./Components/App/App";

//This function finds the weather segment that is closest to the current moment,
//it is used to display the current weather decription and icon in the app
function findClosestSegmentToNow(
  dayData: weatherSegment[]
): weatherSegment | undefined {
  return dayData.find((item: weatherSegment): boolean => {
    const nowInSeconds = Date.now() / 1000;
    return Math.abs(item.dt - 60 * 60 - nowInSeconds) <= (3 * 60 * 60) / 2;
  });
}

//This functions calculates the average temperature of an array of weather segments
function calculateAvTemp(dayData: weatherSegment[]) {
  let summedTemp: number = 0;
  dayData.forEach((item: weatherSegment) => (summedTemp += item.main.temp));
  return summedTemp / dayData.length;
}

//This function is used to group weather segments by date in order to facilitate further
//processing of data. This function assumes that weather segments are already sorted by time.
function groupSegmentsByDate(data: weatherSegment[]): weatherSegment[][] {
  const groupedData: any = [];
  let len: number = 0;
  let lastInd: number = -1;
  data.forEach((item, i) => {
    if (i <= lastInd + len) return;
    var subArr = data.filter(
      elem =>
        new Date(elem.dt * 1000).getDay() === new Date(item.dt * 1000).getDay()
    );
    groupedData.push(subArr);
    len = subArr.length;
    lastInd = i;
  });
  return groupedData;
}

//This function converts temoerature to F or C scale
function convertTemp(value: number, tempScale: string): string {
  const cTemp = value - 273.15;
  if (tempScale === "C") return cTemp.toFixed(1);
  return (1.8 * cTemp + 32).toFixed(1);
}

export {
  findClosestSegmentToNow,
  calculateAvTemp,
  groupSegmentsByDate,
  convertTemp
};
