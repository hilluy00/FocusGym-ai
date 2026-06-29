export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  try {
    const { rutinas } = req.body

    if (!rutinas || rutinas.length === 0) {
      return res.status(400).json({ error: 'No hay rutinas' })
    }

    const prompt = `Eres un entrenador personal experto. El usuario tiene estas rutinas:
${rutinas.map(r => `- ${r.ejercicio}: ${r.series} series x ${r.repeticiones} repeticiones. Objetivo: ${r.objetivo}`).join('\n')}
Dame 3 consejos cortos y motivadores para mejorar su entrenamiento.`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }]
        })
      }
    )

    const data = await response.json()
    console.log('STATUS GEMINI:', response.status)
    console.log('DATA GEMINI:', JSON.stringify(data))

    if (data.error) {
      return res.status(500).json({ consejo: 'Error de Gemini: ' + data.error.message })
    }

    const texto = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!texto) {
      return res.status(500).json({ consejo: 'Gemini no devolvió texto. Data: ' + JSON.stringify(data) })
    }

    res.status(200).json({ consejo: texto })

  } catch (err) {
    console.error('ERROR:', err)
    res.status(500).json({ consejo: 'Error interno: ' + err.message })
  }
}