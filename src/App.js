// ** Router Import
import { useState } from 'react'
import Router from './router/Router'
import { EmailContext } from '@src/utility/context/Can'

const App = props => {
    const [Email, setEmail] = useState('demo@gmail.com')
    return <EmailContext.Provider value={ [Email, setEmail] }> <Router /></EmailContext.Provider>
}

export default App
