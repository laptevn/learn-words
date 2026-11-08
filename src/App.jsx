import { useEffect, useRef, useState } from 'react'
import { groups, TOTAL_WORDS } from './data.js'
import { phonetics } from './phonetics.js'

function shuffle(items, previousWord) {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  if (previousWord && result[0]?.en === previousWord.en && result.length > 1) {
    ;[result[0], result[1]] = [result[1], result[0]]
  }
  return result
}

function DirectionModal({ group, onClose, onStart }) {
  useEffect(() => {
    const close = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [onClose])

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="direction-modal" role="dialog" aria-modal="true" aria-labelledby="direction-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Закрыть">×</button>
        <div className="modal-emoji" style={{ background: `${group.color}22` }}>{group.emoji}</div>
        <p className="eyebrow">Тема «{group.title}»</p>
        <h2 id="direction-title">С какой стороны начнём?</h2>
        <p className="modal-copy">Выбери язык на лицевой стороне карточки</p>
        <div className="direction-options">
          <button className="direction-card russian" onClick={() => onStart('ru')} autoFocus>
            <span className="direction-flags">🇷🇺 <b>→</b> 🇬🇧</span>
            <strong>С русского</strong>
            <small>Сначала угадай слово по-английски</small>
          </button>
          <button className="direction-card english" onClick={() => onStart('en')}>
            <span className="direction-flags">🇬🇧 <b>→</b> 🇷🇺</span>
            <strong>С английского</strong>
            <small>Сначала угадай перевод</small>
          </button>
        </div>
      </section>
    </div>
  )
}

function Home({ onChoose }) {
  return (
    <main className="home">
      <header className="topbar container">
        <a className="brand" href="#top" aria-label="Словолёт, на главную">
          <span className="brand-mark">★</span>
          <span>Словолёт</span>
        </a>
        <div className="catalog-pill"><span>📚</span><b>{TOTAL_WORDS}</b><span className="pill-label">слов</span></div>
      </header>

      <section className="hero container" id="top">
        <div className="hero-copy">
          <div className="hero-kicker"><span>✨</span> Английский — это приключение!</div>
          <h1>Учи слова.<br /><em>Снова и снова!</em></h1>
          <p>Выбирай тему, переворачивай и листай карточки<br className="desktop-only" /> в своём ритме — сколько захочешь.</p>
          <a className="primary-button" href="#themes">Выбрать тему <span>↓</span></a>
          <div className="hero-stats">
            <div><b>{groups.length}</b><span>весёлых тем</span></div>
            <i />
            <div><b>{TOTAL_WORDS}</b><span>английских слов</span></div>
            <i />
            <div><b>∞</b><span>повторений</span></div>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one">hello!</div>
          <div className="orbit orbit-two">ABC</div>
          <div className="sparkle s1">✦</div><div className="sparkle s2">✦</div><div className="sparkle s3">●</div>
          <div className="mascot">
            <div className="mascot-ears"><i /><i /></div>
            <div className="mascot-face"><i className="eye" /><i className="eye" /><b>ᴗ</b></div>
            <div className="mascot-body">A</div>
            <div className="book"><span>HELLO</span><span>ПРИВЕТ</span></div>
          </div>
        </div>
      </section>

      <section className="themes-section" id="themes">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Выбери приключение</p><h2>Что будем учить?</h2></div>
            <p>В каждой теме — 20 карточек.<br />Листай и повторяй без ограничений!</p>
          </div>
          <div className="group-grid">
            {groups.map((group, index) => (
              <button className="group-card" key={group.id} onClick={() => onChoose(group)} style={{ '--accent': group.color, '--delay': `${(index % 5) * 45}ms` }}>
                <span className="group-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="group-emoji" style={{ background: `${group.color}20` }}>{group.emoji}</span>
                <span className="group-title">{group.title}</span>
                <span className="group-meta">20 слов</span>
                <span className="group-arrow">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <footer><span>Сделано с 💜 для маленьких исследователей</span><span>Учись • Играй • Повторяй</span></footer>
    </main>
  )
}

function chooseAdultFemaleVoice(voices) {
  const english = voices.filter((voice) => voice.lang?.toLowerCase().startsWith('en'))
  const preferredNames = ['Samantha', 'Ava', 'Allison', 'Susan', 'Zira', 'Jenny', 'Aria', 'Emma', 'Karen', 'Serena', 'Moira', 'Victoria', 'Fiona']
  return preferredNames.map((name) => english.find((voice) => voice.name.includes(name))).find(Boolean)
    || english.find((voice) => /female|woman/i.test(voice.name))
    || english.find((voice) => voice.localService)
    || english[0]
}

function Study({ group, direction, onExit }) {
  const [cards, setCards] = useState(() => shuffle(group.words))
  const [position, setPosition] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [voice, setVoice] = useState(null)
  const pointerStart = useRef(null)
  const ignoreClick = useRef(false)
  const word = cards[position]
  const frontText = direction === 'en' ? word.en : word.ru
  const backText = direction === 'en' ? word.ru : word.en

  useEffect(() => {
    if (!('speechSynthesis' in window)) return undefined
    const updateVoice = () => setVoice(chooseAdultFemaleVoice(window.speechSynthesis.getVoices()))
    updateVoice()
    window.speechSynthesis.addEventListener('voiceschanged', updateVoice)
    return () => window.speechSynthesis.removeEventListener('voiceschanged', updateVoice)
  }, [])

  const move = (step) => {
    setFlipped(false)
    if (step < 0) {
      setPosition((current) => Math.max(0, current - 1))
      return
    }
    if (position < cards.length - 1) {
      setPosition((current) => current + 1)
      return
    }
    const moreCards = shuffle(group.words, word)
    setCards((current) => [...current, ...moreCards])
    setPosition((current) => current + 1)
  }

  const animateMove = (step) => {
    if (animating || (step < 0 && position === 0)) {
      setDragX(0)
      return
    }
    setAnimating(true)
    setDragX(step > 0 ? -window.innerWidth : window.innerWidth)
    window.setTimeout(() => {
      move(step)
      setAnimating(false)
      setDragX(0)
    }, 210)
  }

  const onPointerDown = (event) => {
    if (event.target.closest('.sound-button')) return
    pointerStart.current = event.clientX
    ignoreClick.current = false
    setDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (pointerStart.current === null) return
    const distance = event.clientX - pointerStart.current
    if (Math.abs(distance) > 8) ignoreClick.current = true
    setDragX(Math.max(-180, Math.min(180, distance)))
  }

  const onPointerEnd = () => {
    if (pointerStart.current === null) return
    pointerStart.current = null
    setDragging(false)
    if (Math.abs(dragX) > 65) animateMove(dragX < 0 ? 1 : -1)
    else setDragX(0)
    window.setTimeout(() => { ignoreClick.current = false }, 0)
  }

  const speak = (event) => {
    event.stopPropagation()
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(word.en)
    utterance.lang = voice?.lang || 'en-US'
    utterance.voice = voice
    utterance.rate = 0.82
    utterance.pitch = 0.9
    window.speechSynthesis.speak(utterance)
  }

  useEffect(() => {
    const keyboard = (event) => {
      if (event.key === 'ArrowLeft') animateMove(-1)
      if (event.key === 'ArrowRight') animateMove(1)
      if (event.key === 'Escape') onExit()
    }
    window.addEventListener('keydown', keyboard)
    return () => window.removeEventListener('keydown', keyboard)
  })

  const pronunciation = (
    <div className="pronunciation-notes">
      <span className="ipa"><small>Транскрипция</small>{phonetics[word.en]}</span>
    </div>
  )

  return (
    <main className="study-page" style={{ '--group': group.color }}>
      <header className="study-header">
        <button className="close-learning" onClick={onExit} aria-label="Закрыть тему и выбрать другую"><b>×</b><span>Выбрать тему</span></button>
        <div className="study-topic"><span>{group.emoji}</span><div><small>Тема</small><b>{group.title}</b></div></div>
        <div className="swipe-status">↔ <span>листай</span></div>
      </header>

      <section className="study-content">
        <div className="study-intro">
          <p className="eyebrow">Листай карточки</p>
          <h1>{flipped ? 'Получилось?' : 'Угадай перевод!'}</h1>
          <p>{flipped ? 'Смахни влево, когда будешь готова' : 'Нажми на карточку, чтобы проверить себя'}</p>
        </div>

        <div
          className={`flashcard ${flipped ? 'is-flipped' : ''} ${dragging ? 'is-dragging' : ''} ${animating ? 'is-animating' : ''}`}
          style={{ transform: `translateX(${dragX}px) rotate(${dragX / 35}deg)`, opacity: animating ? 0 : 1 }}
          onClick={() => { if (!ignoreClick.current) setFlipped((value) => !value) }}
          onKeyDown={(event) => {
            if (event.key === ' ' || event.key === 'Enter') {
              event.preventDefault()
              setFlipped((value) => !value)
            }
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
          role="button"
          tabIndex="0"
          aria-label="Перевернуть карточку. Смахни влево для следующей, вправо для предыдущей"
        >
          <div className="card-inner">
            <div className="card-face card-front">
              <span className="card-language">{direction === 'en' ? 'ENGLISH' : 'РУССКИЙ'}</span>
              <span className="word-emoji">{word.emoji}</span>
              <strong className={`${direction === 'en' ? 'english-word' : ''} ${frontText.length > 11 ? 'long-word' : ''}`}>{frontText}</strong>
              {direction === 'en' && pronunciation}
              {direction === 'en' && <button type="button" className="sound-button" onClick={speak} aria-label="Прослушать произношение взрослым женским голосом">🔊 Прослушать</button>}
              <span className="flip-hint">↻ Нажми, чтобы перевернуть</span>
            </div>
            <div className="card-face card-back">
              <span className="card-language">{direction === 'en' ? 'РУССКИЙ' : 'ENGLISH'}</span>
              <span className="word-emoji">{word.emoji}</span>
              <strong className={`${direction !== 'en' ? 'english-word' : ''} ${backText.length > 11 ? 'long-word' : ''}`}>{backText}</strong>
              {direction !== 'en' && pronunciation}
              {direction !== 'en' && <button type="button" className="sound-button" onClick={speak} aria-label="Прослушать произношение взрослым женским голосом">🔊 Прослушать</button>}
              <span className="flip-hint">↻ Нажми, чтобы перевернуть</span>
            </div>
          </div>
        </div>

        <div className="swipe-guide" aria-label="Подсказка по управлению">
          <span className={position === 0 ? 'is-muted' : ''}>← <b>назад</b></span>
          <i>проведи пальцем</i>
          <span><b>дальше</b> →</span>
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [chosenGroup, setChosenGroup] = useState(null)
  const [session, setSession] = useState(null)

  useEffect(() => { document.title = session ? `${session.group.title} — Словолёт` : 'Словолёт — английские слова' }, [session])

  if (session) return <Study {...session} onExit={() => setSession(null)} />

  return (
    <>
      <Home onChoose={setChosenGroup} />
      {chosenGroup && <DirectionModal group={chosenGroup} onClose={() => setChosenGroup(null)} onStart={(direction) => { setSession({ group: chosenGroup, direction }); setChosenGroup(null); window.scrollTo(0, 0) }} />}
    </>
  )
}
