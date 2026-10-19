import { useRef, useState } from 'react'
import './App.css'
import { useReactToPrint } from 'react-to-print';

const docs = Array.from({ length: 50 }, (_, i) => i + 1)

type Filtro = "todo" | "metade-cima" | "metade-baixo"

function App() {
  const [filtro, setFiltro] = useState<Filtro>("todo")
  const pdfRef = useRef<HTMLDivElement>(null);

  const docsFiltrados = docs.filter((numero) => {
  if (filtro === 'metade-cima') return numero >= 26
  if (filtro === 'metade-baixo') return numero <= 25
  return true
})

  const handlePrint = useReactToPrint({
    contentRef: pdfRef,
  });

  return (
    <>
      <div className='container'>
        <div className='actions'>
          <select
            value={filtro}
            onChange={(event) => setFiltro(event.target.value as Filtro)}
            aria-label='Filtrar números'
          >
            <option value='todo'>Todos</option>
            <option value='metade-cima'>Metade de cima (26–50)</option>
            <option value='metade-baixo'>Metade de baixo (1–25)</option>
          </select>
          <button onClick={handlePrint}>Gerar PDF</button>
        </div>

        <div className='content'>
          <h1>TESTE</h1>
          {docsFiltrados.map((numero) => <p key={numero}>{numero}</p>)}
        </div>

        <div ref={pdfRef} className='pdf-content'>
          <h1>Relatório personalizado</h1>
          <p>Números selecionados: {docsFiltrados.length}</p>
          <div className='pdf-numbers'>
            {docsFiltrados.map((numero) => <p key={numero}>{numero}</p>)}
          </div>
        </div>

      </div>
    </>
  )
}

export default App
