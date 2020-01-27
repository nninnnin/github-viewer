import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Popular from './components/Popular'
import Battle from './components/Battle'
import './index.css'

function App () {
  const [showBattle, setShowBattle] = useState(false);

  function toggleView (showBattle, ev) {
    ev.preventDefault();
    setShowBattle(showBattle);
  }

  return (
    <div className='container'>
      <div className='grid space-between'>
        <a className='link' onClick={toggleView.bind(null, false)}>Popular Repositories</a>
        <a className='link' onClick={toggleView.bind(null, true)}>Github User Battle</a>
      </div>
      {
        !showBattle && <Popular />
      }
      {
        showBattle && <Battle />
      }
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
