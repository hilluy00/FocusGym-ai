export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' })
  }

  const { rutinas } = req.body

  const prompt = `Eres un entrenador personal experto. El usuario tiene estas rutinas de ejercicio:
${rutinas.map(r => `- ${r.ejercicio}: ${r.series} series x ${r.repeticiones} repeticiones. Objetivo: ${r.objetivo}`).join('\n')}

Dame consejos personalizados, cortos y motivadores para mejorar su entrenamiento.`

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }]
      })
    }
  )

  const data = await response.json()
  console.log('Gemini response:', JSON.stringify(data))

  const texto = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sin respuesta'
  res.status(200).json({ consejo: texto })
}