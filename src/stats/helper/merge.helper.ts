type StatItem = {
  count: number;
  date: string;
};

type InputData = {
  boardStats: StatItem[];
  componentStats: StatItem[];
  diagramas: StatItem[];
};

type MergedStat = {
  date: string;
  componentStats: number;
  boardStats: number;
  diagramStats: number;
};

type MergedStatResult = {
  name: string;
  tableros: number;
  componentes: number;
};

export function mergeStats(data: InputData): MergedStatResult[] {
  const resultMap = new Map<string, MergedStat>();

  for (const item of data.componentStats) {
    const { date, count } = item;
    if (!resultMap.has(date)) {
      resultMap.set(date, {
        date,
        componentStats: 0,
        boardStats: 0,
        diagramStats: 0,
      });
    }
    resultMap.get(date)!.componentStats = count;
  }

  for (const item of data.boardStats) {
    const { date, count } = item;
    if (!resultMap.has(date)) {
      resultMap.set(date, {
        date,
        componentStats: 0,
        boardStats: 0,
        diagramStats: 0,
      });
    }
    resultMap.get(date)!.boardStats = count;
  }

  for (const item of data.diagramas) {
    const { date, count } = item;
    if (!resultMap.has(date)) {
      resultMap.set(date, {
        date,
        componentStats: 0,
        boardStats: 0,
        diagramStats: 0,
      });
    }
    resultMap.get(date)!.diagramStats = count;
  }

  const results = Array.from(resultMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  );

  return results.map((v) => {
    const { date, componentStats, boardStats, diagramStats } = v;
    const dateF = new Date(date);
    const dateName = dateF.toLocaleDateString('es-ES', { weekday: 'long' });
    return {
      name: `${date} - ${dateName}`,
      componentes: componentStats,
      tableros: boardStats,
      diagramas: diagramStats,
    };
  });
}
