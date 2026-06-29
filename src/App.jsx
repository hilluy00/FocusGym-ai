import { useState, useEffect } from 'react'
import { supabase } from './lib/supabaseClient'
import FormRutina from './components/FormRutina'
import ListaRutinas from './components/ListaRutinas'
import ConsultaIA from './components/ConsultaIA'

export default function App() {
  const [rutinas, setRutinas] = useState([])

  const cargarRutinas = async () => {
    const { data } = await supabase.from('rutinas').select('*').order('created_at', { ascending: false })
    setRutinas(data || [])
  }

  useEffect(() => { cargarRutinas() }, [])

  const total = rutinas.reduce((acc, r) => ({
    series: acc.series + r.series,
    reps: acc.reps + r.repeticiones
  }), { series: 0, reps: 0 })

  return (
    <div style={s.app}>
      <div style={s.header}>
        <h1 style={s.logo}>Focus<span style={s.logoBlue}>Gym</span> AI</h1>
        <p style={s.subtitle}>Tu entrenador inteligente</p>
      </div>

      <div style={s.stats}>
        <div style={s.statCard}><div style={s.statNum}>{rutinas.length}</div><div style={s.statLabel}>Rutinas</div></div>
        <div style={s.statCard}><div style={s.statNum}>{total.series}</div><div style={s.statLabel}>Series</div></div>
        <div style={s.statCard}><div style={s.statNum}>{total.reps}</div><div style={s.statLabel}>Reps</div></div>
      </div>

      <FormRutina onRutinaAgregada={cargarRutinas} />
      <ListaRutinas rutinas={rutinas} />
      <ConsultaIA rutinas={rutinas} />
    </div>
  )
}

const s = {
  app: { background: '#0a0a0a', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif', color: '#f0f0f0', maxWidth: '620px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '28px', borderBottom: '1px solid #222', paddingBottom: '20px' },
  logo: { fontSize: '28px', fontWeight: '500', color: '#f5c842', margin: 0 },
  logoBlue: { color: '#3b9eff' },
  subtitle: { fontSize: '13px', color: '#666', marginTop: '4px' },
  stats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' },
  statCard: { background: '#111', border: '1px solid #1e1e1e', borderRadius: '10px', padding: '12px', textAlign: 'center' },
  statNum: { fontSize: '24px', fontWeight: '500', color: '#f5c842' },
  statLabel: { fontSize: '11px', color: '#555', marginTop: '2px' },
}