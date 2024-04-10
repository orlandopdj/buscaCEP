import { useState } from 'react'
import { FiSearch } from "react-icons/fi";

import api from './services/api';
import './App.css'

function App() {
  const [input, setInput] = useState('')
  const [dados, setDados] = useState('')

  const handleSearch = async () => {
    if (input === '') {
      alert('Preencha algum CEP')
      return
    }

    try {
      const response = await api.get(`${input}/json`)
      setInput('')
      setDados(response.data)
      console.log(response.data)
    }
    catch {
      console.log('Erro ao buscar dados')
      setInput('')
    }
  }

  return (
    <div className='container'>

      <h1 className='title'>Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder='Digite seu cep'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff0f0' />
        </button>

      </div>

      <main className='containerDados'>
        {dados.cep && <h2>CEP: {dados.cep}</h2>}
        {dados.logradouro && <span>Rua: {dados.logradouro}</span>}
        {dados.complemento && <span>Complemento: {dados.complemento}</span>}
        {dados.bairro && <span>Bairro: {dados.bairro}</span>}
        {dados.localidade && <span>{dados.localidade} - {dados.uf}</span>}
      </main>
    </div>
  )
}

export default App
