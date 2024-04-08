import { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({children}) => {
    
        const navigate = useNavigate()
        const [ loading, setLoading ] = useState(true)    
        const [ authToken, setAuthToken ] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
        const [ user, setUser ] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)

    useEffect(() => {

        if (loading) {
            updateToken()
        }

        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (authToken){
                updateToken()
            }
        }, fourMinutes)
        return () => clearInterval(interval)
    }, [authToken, loading])

    const loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value} )
        })
        let data = await response.json()
        console.log('data', data);
        if (response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            console.log(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/')
        }else {
            console.log('somethings wrong');
        }
    }

    const logoutUser = () => {
        setUser(null)
        setAuthToken(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async () => {
        console.log('am called');
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify({'refresh': authToken?.refresh})
        })
        let data = await response.json()
        if (response.status === 200){
            setAuthToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
        }else {
            logoutUser()  
            console.log('wrogn');         
        }

        if (loading) {
            setLoading(false)
        }

    }

    const contextData = {
        loginUser,
        user,
        logoutUser,
        authToken,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}