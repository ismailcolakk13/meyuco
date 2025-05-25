import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container">
        <h1 className="text-center my-4">Welcome to My App</h1>
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={() => setCount(count + 1)}
          >
            Count: {count}
          </button>
        </div>
      </div>
      <footer className="text-center mt-4">
        <p>© 2023 My App</p>
      </footer>
    </>
  )
}

export default App
