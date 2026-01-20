'use client'

import { useState } from 'react'

type Subject = {
  name: string
  difficulty: number
}

type DailyPlan = {
  day: string
  tasks: string[]
}

type PlanResponse = {
  strategy: string
  plan: DailyPlan[]
}

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [newSubject, setNewSubject] = useState('')
  const [difficulty, setDifficulty] = useState(3)

  const [hours, setHours] = useState(4)
  const [deadline, setDeadline] = useState('2026-02-10')

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<PlanResponse | null>(null)

  const generatePlan = async () => {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('http://127.0.0.1:8000/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjects,
          hours_per_day: hours,
          deadline
        })
      })

      const data = await res.json()
      setResult(data)
    } catch {
      setResult({
        strategy: 'Safe study plan generated (AI temporarily unavailable)',
        plan: [
          {
            day: 'Day 1',
            tasks: ['Light revision', 'Practice basics']
          }
        ]
      })
    }

    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center px-6 py-10">
      {/* Header */}
      <h1 className="text-4xl font-bold tracking-wider text-red-500">
        LOCKDOWN
      </h1>
      <p className="text-zinc-400 mt-2 text-center">
        AI Study Planner – Lock your focus. Execute your plan.
      </p>

      {/* Input Card */}
      <div className="mt-10 w-full max-w-xl bg-zinc-900 p-6 rounded-xl border border-zinc-800">
        {/* Subject Input */}
        <div className="mb-6">
          <label className="block text-sm text-zinc-400 mb-1">
            Subject
          </label>
          <input
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="e.g. DSA"
            className="w-full bg-zinc-800 p-2 rounded mb-2"
          />

          <label className="block text-sm text-zinc-400 mb-1">
            Difficulty: {difficulty}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="w-full"
          />

          <button
            onClick={() => {
              if (!newSubject.trim()) return
              setSubjects([...subjects, { name: newSubject, difficulty }])
              setNewSubject('')
              setDifficulty(3)
            }}
            className="mt-3 w-full bg-zinc-700 hover:bg-zinc-600 transition py-2 rounded"
          >
            Add Subject
          </button>
        </div>

        {/* Subject List */}
        {subjects.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm text-zinc-400 mb-2">
              Subjects
            </h3>
            {subjects.map((s, i) => (
              <div
                key={i}
                className="flex justify-between items-center bg-zinc-800 p-2 rounded mb-2"
              >
                <span>
                  {s.name} (Difficulty {s.difficulty})
                </span>
                <button
                  onClick={() =>
                    setSubjects(subjects.filter((_, idx) => idx !== i))
                  }
                  className="text-red-400 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hours */}
        <label className="block mb-4">
          <span className="text-sm text-zinc-400">Hours per day</span>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="mt-1 w-full bg-zinc-800 p-2 rounded"
          />
        </label>

        {/* Deadline */}
        <label className="block mb-6">
          <span className="text-sm text-zinc-400">Deadline</span>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 w-full bg-zinc-800 p-2 rounded"
          />
        </label>

        <button
          onClick={generatePlan}
          disabled={loading || subjects.length === 0}
          className="w-full bg-red-600 hover:bg-red-700 transition py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? 'LOCKDOWN INITIATED…' : 'Generate Plan'}
        </button>
      </div>

      {/* Output */}
      {result && (
        <div className="mt-10 w-full max-w-xl bg-zinc-900 p-6 rounded-xl border border-zinc-800">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Strategy
          </h2>
          <p className="text-zinc-300 mb-4">{result.strategy}</p>

          {result.plan.map((day, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-semibold text-zinc-200">
                {day.day}
              </h3>
              <ul className="list-disc list-inside text-zinc-400">
                {day.tasks.map((task, i) => (
                  <li key={i}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
