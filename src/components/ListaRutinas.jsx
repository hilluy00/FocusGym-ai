export default function ListaRutinas({ rutinas }) {
  return (
    <div style={s.section}>
      <div style={s.sectionTitle}>Mis rutinas</div>
      {rutinas.length === 0
        ? <p style={s.empty}>No hay rutinas aún. ¡Agrega una!</p>
        : rutinas.map(r => (
          <div key={r.id} style={s.card}>
            <div>
              <div style={s.nombre}>{r.ejercicio}</div>
              <div style={s.meta}>{r.series} series × {r.repeticiones} reps</div>
            </div>
            <div style={s.tag}>{r.objetivo}</div>
          </div>
        ))
      }
    </div>
  )
}

const s = {
  section: { marginBottom: '24px' },
  sectionTitle: { fontSize: '12px', fontWeight: '500', color: '#f5c842', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' },
  empty: { color: '#555', fontSize: '14px', padding: '16px 0' },
  card: { background: '#111', border: '1px solid #1e1e1e', borderLeft: '3px solid #f5c842', borderRadius: '10px', padding: '14px 16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  nombre: { fontSize: '15px', fontWeight: '500', color: '#f0f0f0' },
  meta: { fontSize: '12px', color: '#555', marginTop: '3px' },
  tag: { background: '#0d1a2a', border: '1px solid #1a3a5a', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', color: '#3b9eff' },
}