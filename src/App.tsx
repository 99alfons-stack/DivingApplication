import { useState } from 'react'
import './App.css'

type ViewKey = 'businessPlan' | 'projectIdea' | 'background'

const viewContent: Record<ViewKey, { title: string; body: string }> = {
  businessPlan: {
    title: 'Affarsplan',
    body:
      'Jag utvecklar en mobilapp som samlar allt en dykare behöver i en enda plattform. Istället för att använda flera olika verktyg kan användare logga sina dyk, upptäcka nya dykplatser och dela sina upplevelser direkt i appen. Mitt mål är att göra dykning enklare, mer organiserad och mer inspirerande – samtidigt som jag skapar en modern och skalbar lösning för en global målgrupp.',
  },
  projectIdea: {
    title: 'Projektide',
    body:
      'Min idé är att skapa en mobilapp som samlar allt en dykare behöver i en och samma plattform – från loggbok till dykplatser och community. Idén bygger på ett tydligt problem: idag är information om dykning utspridd, och många använder fortfarande gamla eller ineffektiva lösningar som fysiska loggböcker eller flera olika appar. Dessutom finns det brister i hur dyk verifieras och dokumenteras, vilket kan påverka både säkerhet och vidareutbildning. Jag vill lösa detta genom att skapa en modern, användarvänlig och pålitlig app som gör det enkelt att dokumentera, organisera och dela dyk. Målet är inte bara att förenkla dykning – utan att göra den mer tillgänglig, strukturerad och inspirerande för alla som delar samma intresse.',
  },
  background: {
    title: 'Min bakgrund',
    body:
      'Jag är initiativtagare till projektet och har ett stort intresse för dykning, vilket ger mig en tydlig förståelse för målgruppens behov och de problem som finns idag. Genom egna erfarenheter har jag sett bristerna i nuvarande lösningar, vilket har varit grunden till att utveckla denna idé. Utöver detta har jag kunskap inom projektplanering och digitala lösningar, vilket gör att jag kan strukturera, planera och driva projektet framåt på ett effektivt sätt. Projektet bygger också på ett tydligt fokus på användarvänlighet och funktionalitet, där målet är att skapa en stabil och genomtänkt produkt. Jag är rätt person att driva detta projekt eftersom jag kombinerar ett genuint intresse för dykning med en vilja att lösa ett konkret problem och utveckla en hållbar lösning.',
  },
}

function App() {
  const [activeView, setActiveView] = useState<ViewKey>('businessPlan')
  const activeContent = viewContent[activeView]

  return (
    <main className="app-shell">
      <section className="card">
        <h1>Dykapp</h1>
        <p className="intro"></p>

        <nav className="tabs" aria-label="Val av innehallsvy">
          <button
            type="button"
            className={activeView === 'businessPlan' ? 'tab active' : 'tab'}
            onClick={() => setActiveView('businessPlan')}
          >
            Affarsplan
          </button>
          <button
            type="button"
            className={activeView === 'projectIdea' ? 'tab active' : 'tab'}
            onClick={() => setActiveView('projectIdea')}
          >
            Projektide
          </button>
          <button
            type="button"
            className={activeView === 'background' ? 'tab active' : 'tab'}
            onClick={() => setActiveView('background')}
          >
            Min bakgrund
          </button>
        </nav>

        <article className="view-panel" aria-live="polite">
          <h2>{activeContent.title}</h2>
          <p>{activeContent.body}</p>
        </article>
      </section>
    </main>
  )
}

export default App