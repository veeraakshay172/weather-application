import React from 'react'
import { WeatherProvider } from './context/WeatherContext'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard' // We'll create this next

function App() {
  return (
    <WeatherProvider>
      <Layout>
        {/* Placeholder for Dashboard */}
        <div className="text-center py-20">
          <Dashboard />
        </div>
      </Layout>
    </WeatherProvider>
  )
}

export default App
