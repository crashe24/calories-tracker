import { useEffect, useMemo, useReducer } from "react"
import ActivityListComponent from "./components/ActivityList/ActivityList"
import CaloryTrackerComponent from "./components/CaloryTracker/CaloryTracker"


import FormComponent from "./components/Form/FormComponent"
import { ActivityReducer, initialState } from "./reducers/activity-reducer"


function App() {
  
  const [state, dispatch] = useReducer(ActivityReducer,initialState)

  useEffect(() => {
    localStorage.setItem('activities',JSON.stringify(state.activities))
  }, [state.activities])
  

  const canRestarApp  = () => useMemo(() => state.activities.length, [state.activities])
  
  return (
    <>
      <header className = 'bg-lime-600 py-3'>
        <div className= 'max-w-4xl mx-auto flex justify-between'>
            <h1 className='text-center text-lg font-bold text-white uppercase'>
              Contador de Calorias
            </h1>
            <button 
              className='w-60 bg-gray-800 hove:bg-gray-900  
              uppercase text-white cursor-pointer rounded-lg 
              text-sm
              disabled:opacity-10'
              disabled={!canRestarApp()}
              onClick={()=>dispatch({type:"restart-app"})}>
                Reiniciar app</button>
        </div>
      </header>
      <section className='bg-lime-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <FormComponent
            state = {state}
           dispatch={dispatch} />
        </div>
      </section>
      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CaloryTrackerComponent activities={state.activities}/>
        </div>
      </section>
      <section className='p-10 mx-auto'>
        <ActivityListComponent activities ={state.activities}   dispatch={dispatch} />
      </section>
      
    </>
  )
}

export default App
