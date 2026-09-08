import { useQuery, useQueryClient } from '@tanstack/react-query'

function App() {
  const queryClient = useQueryClient()
  const { data: count = 0 } = useQuery({
    queryKey: ['counter'],
    queryFn: async () => 0,
  })

  const increment = () => {
    queryClient.setQueryData<number>(['counter'], (currentCount = 0) => currentCount + 1)
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 sm:px-10">
      <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-5xl flex-col justify-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">
          Primmer UI
        </p>
        <h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-7xl">
          A clean foundation for thoughtful interfaces.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
          Tailwind utilities keep the visual language close to the component, while TanStack Query
          provides the shared state boundary.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200 focus:outline-2 focus:outline-offset-4 focus:outline-cyan-300"
            onClick={increment}
          >
            Count is {count}
          </button>
          <span className="text-sm text-slate-400">Stored in the TanStack Query cache</span>
        </div>
      </section>
    </main>
  )
}

export default App
