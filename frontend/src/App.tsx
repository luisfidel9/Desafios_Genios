import Router from "./routes"
import UserProvider from "./context"

function App() {

  

  return (
    
      <>
        <div className="app">
          <UserProvider>
            <Router/>
          </UserProvider>
        </div>
      </>
    
  )
}

export default App
