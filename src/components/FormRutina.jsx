import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function FormRutina({ onRutinaAgregada }) {
  const [form, setForm] = useState({ ejercicio: '', series: '', repeticiones: '', objetivo: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.from('rutinas').insert([{
      ejercicio: form.ejercicio,
      series: parseInt(form.series),
      repeticiones: parseInt(form.repeticiones),
      objetivo: form.objetivo
    }])
    if (!error) {
      setForm({ ejercicio: '', series: '', repeticiones: '', objetivo: '' })
      onRutinaAgregada()
    } else {
      alert('Error: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div style={s.section}>
      <div style={s.sectionTitle}>Nueva rutina</div>
      <div style={s.card}>
        <form onSubmit={handleSubmit}>
          <div style={s.grid}>
            {[
              { name: 'ejercicio', label: 'Ejercicio', type: 'text', placeholder: 'Sentadillas' },
              { name: 'objetivo', label: 'Objetivo', type: 'text', placeholder: 'Masa muscular' },
              { name: 'series', label: 'Series', type: 'number', placeholder: '4' },
              { name: 'repeticiones', label: 'Repeticiones', type: 'number', placeholder: '12' },
            ].map(f => (
              <div key={f.name} style={s.inputGroup}>
                <label style={s.label}>{f.label}</label>
                <input
                  name={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.name]}
                  onChange={handleChange}
                  required
                  style={s.input}
                />
              </div>
            ))}
          </div>
          <button type="submit" disabled={loading} style={s.btnPrimary}>
            {loading ? 'Guardando...' : '+ Guardar rutina'}
          </button>
        </form>
      </div>
    </div>
  )
}

const s = {
  section: { marginBottom: '24px' },
  sectionTitle: { fontSize: '12px', fontWeight: '500', color: '#f5c842', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' },
  card: { background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '11px', color: '#666', textTransform: 'uppercase', letterSpacing: '0.5px' },
  input: { background: '#0a0a0a', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#f0f0f0', outline: 'none', width: '100%' },
  btnPrimary: { background: '#f5c842', color: '#0a0a0a', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', marginTop: '4px' },
}