import Link from 'next/link'


export default function Route() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Welcome to the App</h1>
        <p className="mb-4">Please <Link href="/login" className="text-blue-500 underline">login</Link> to continue.</p>
      </div>
    </div>
  )
}