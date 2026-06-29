import { useState } from 'react'

export default function ConsultaIA({ rutinas }) {
  const [consejo, setConsejo] = useState('')
  const [loading, setLoading] = useState(false)

  const consultarIA = async () => {
    if (rutinas.length === 0) return alert('Primero agrega rutinas')
    setLoading(true)
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rutinas })
    })
    const data = await res.json()
    setConsejo(data.consejo)
    setLoading(false)
  }

  return (
    <div style={s.section}>
      <div style={s.sectionTitle}>Entrenador IA</div>
      <div style={s.card}>
        <button onClick={consultarIA} disabled={loading} style={s.btnAI}>
          {loading ? 'Consultando IA...' : 'Pedir consejo al IA'}
        </button>
        {consejo && (
          <div style={s.respuesta}>
            <p style={s.texto}>{consejo}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const s = {
  section: { marginBottom: '24px' },
  sectionTitle: { fontSize: '12px', fontWeight: '500', color: '#f5c842', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  card: { background: '#0d1117', border: '1px solid #1a2a1a', borderRadius: '12px', padding: '20px' },
  btnAI: { background: 'transparent', border: '1px solid #3b9eff', color: '#3b9eff', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', cursor: 'pointer', width: '100%', marginBottom: '0' },
  respuesta: { borderLeft: '3px solid #3b9eff', borderRadius: '0 8px 8px 0', padding: '12px 14px', marginTop: '14px', background: '#111' },
  texto: { fontSize: '13px', color: '#aaa', lineHeight: '1.7' },
}