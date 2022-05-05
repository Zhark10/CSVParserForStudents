import { TWord, ELanguage } from "../store/translator-types"

export const parseCSV = (csvTable: [string, string][])  => {
  const result: TWord[] = []
  csvTable.forEach(([value1, value2], index)=>{
    if (index === 0) return
    const dynamicLanguageKey1 = csvTable[0][0].toUpperCase() as ELanguage.RUS // or ELanguage.ENG
    const dynamicLanguageKey2 = csvTable[0][1].toUpperCase() as ELanguage.ENG // or ELanguage.RUS
    result.push({
      [dynamicLanguageKey1]: value1,
      [dynamicLanguageKey2]: value2,
      secret: false,
    })
  })
  return result
}