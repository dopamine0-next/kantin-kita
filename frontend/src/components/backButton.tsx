'use client'

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="fixed absolute top-24 left-4 z-50 rounded-full bg-white px-4 py-2 shadow"
    >
      ← Back
    </button>
  )
}
