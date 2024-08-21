import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  
  const [length, setLength] = useState("8")

  const [numberAllowed, setNumberAllowed] = useState(false)

  const [charAllowed, setCharAllowed] = useState(false)

  const [password, setPassword] = useState("")

  // userRef hook intlzn
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback( ()=>{

    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if(numberAllowed){
      str = str + '0123456789'

    }

    if (charAllowed){

      str = str + '!@#$%^&*()'

    }

    for(let i=0; i<= length; i++){

      let char = Math.floor( Math.random()*(str.length) + 1 )

      pass = pass + str.charAt(char)

    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback( ()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,8)

    window.navigator.clipboard.writeText(password)

  }, [password])

  useEffect( ()=> {
    passwordGenerator()
  } , [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>

    <h4 className='text-2xl text-center  text-lime-800'>Password Generator#@$%%</h4>

    <div className='w-full max-w-md mx-auto shadow-lg rounded-lg px-4 my-6 text-indigo-950 bg-yellow-300'>
      
      <div className='flex shadow-md rounded-s-md overflow-hidden mb-5'>

        <input type="text" placeholder='enter password' value={password} readOnly className='w-full' ref={passwordRef} />

        <button className='flex shadow-md rounded-s-md overflow-hidden mb-5 bg-amber-600' onClick={copyPasswordToClipboard}>
          COPY Password..
        </button>

      </div>

      <div className='flex text-base gap-x-2'>
        <div className='flex items-center gap-x-2'>
          <input type="range" min={8} max={35} value={length} className="cursor-pointer"  onChange={ (event)=>{
            return setLength(event.target.value )

          }}/>

          <label>
            Length: {length}
          </label>
        </div>

        <div className='flex items-center gap-x-2'>

          <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={ ()=>{
            setNumberAllowed( (prev)=>(!prev)  )
          }} />

          <label htmlFor='numberInput'>
            Number
          </label>
        
        </div>

        <div className='flex items-center gap-x-2'>

        <input type="checkbox" defaultChecked={charAllowed} id="charrInput" onChange={ ()=>{
            setCharAllowed( (prev)=>(!prev)  )
          }} />

          <label htmlFor='charInput'>
            Character
          </label>

        </div>

      </div>

    </div>
     
    </>
  )
}

export default App
