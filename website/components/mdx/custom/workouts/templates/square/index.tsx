const S = 5;

export function square(DateHelper: any, options: any) {
  const getDates = (start: number, end: number) =>
    DateHelper.intervals("day", start, DateHelper.date(end));

  return {
    name: "square",
    parent: "day",
    rowsCount: () => S,
    columnsCount: () => S,
    mapping: (start: number, end: number, defaultValues: any) => {
      const allDates = getDates(start, end);
      const dates = allDates.slice(-S * S);
      return dates.map((t: number, i: number) => ({
        t,
        x: i % S,
        y: Math.floor(i / S),
        ...defaultValues,
      }));
    },
    extractUnit: (ts: number) => DateHelper.date(ts).startOf("day").valueOf(),
  };
}
