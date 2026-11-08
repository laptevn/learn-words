import { writeFile } from 'node:fs/promises'
import { dictionary } from 'cmu-pronouncing-dictionary'
import { groups } from '../src/data.js'

const vowels = {
  AA: 'ɑ', AE: 'æ', AH: ['ə', 'ʌ'], AO: 'ɔ', AW: 'aʊ', AY: 'aɪ', EH: 'ɛ',
  ER: ['ɚ', 'ɝ'], EY: 'eɪ', IH: 'ɪ', IY: 'i', OW: 'oʊ', OY: 'ɔɪ', UH: 'ʊ', UW: 'u',
}
const consonants = {
  B: 'b', CH: 'tʃ', D: 'd', DH: 'ð', F: 'f', G: 'ɡ', HH: 'h', JH: 'dʒ', K: 'k',
  L: 'l', M: 'm', N: 'n', NG: 'ŋ', P: 'p', R: 'r', S: 's', SH: 'ʃ', T: 't', TH: 'θ',
  V: 'v', W: 'w', Y: 'j', Z: 'z', ZH: 'ʒ',
}

function arpabetToIpa(value) {
  const tokens = value.split(' ')
  const vowelCount = tokens.filter((token) => vowels[token.replace(/[012]/, '')]).length
  return tokens.map((token) => {
    const sound = token.replace(/[012]/, '')
    const stress = token.match(/[12]/)?.[0]
    if (vowels[sound]) {
      const ipa = Array.isArray(vowels[sound]) ? vowels[sound][stress ? 1 : 0] : vowels[sound]
      const mark = vowelCount > 1 ? (stress === '1' ? 'ˈ' : stress === '2' ? 'ˌ' : '') : ''
      return `${mark}${ipa}`
    }
    return consonants[sound] || ''
  }).join('')
}

function lookupWord(word) {
  const key = word.toLowerCase()
  const exact = dictionary[key]
  if (exact) return arpabetToIpa(exact)
  return key.split(/[ -]+/).map((part) => dictionary[part] ? arpabetToIpa(dictionary[part]) : part).join(' ')
}

const englishWords = [...new Set(groups.flatMap((group) => group.words.map((word) => word.en)))]
const entries = englishWords.map((word) => `  ${JSON.stringify(word)}: ${JSON.stringify(`/${lookupWord(word)}/`)},`)
await writeFile(new URL('../src/phonetics.js', import.meta.url), `export const phonetics = {\n${entries.join('\n')}\n}\n`)
console.log(`Generated ${entries.length} IPA transcriptions`)
