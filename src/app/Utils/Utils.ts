export function replaceNullsWithUndefined(
  obj: object | null
): object | undefined {
  if (obj === null) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    return obj.map(replaceNullsWithUndefined);
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        replaceNullsWithUndefined(value),
      ])
    );
  }

  return obj;
}
export const getLifeCycleLabel = (lifeCycle: number): string => {
  switch (lifeCycle) {
    case 1:
      return "Nenhum";
    case 2:
      return "Assinante";
    case 3:
      return "Em nutrição";
    case 4:
      return "Em qualificação";
    case 5:
      return "Qualificado";
    case 6:
      return "Descartado";
    case 7:
      return "Qualificado com sucesso";
    case 8:
      return "Qualificado sem sucesso";
    case 9:
      return "Negociação";
    case 10:
      return "Cliente";
    case 11:
      return "Perdido";
    case 12:
      return "Inativo";
    default:
      return "Desconhecido";
  }
};
