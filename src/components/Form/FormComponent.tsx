
import * as React from 'react'
import {v4 as uuidV4} from 'uuid'
import { useState } from 'react'
import { categories } from '../../data/category'
import { ActivityActions, ActivityState } from '../../reducers/activity-reducer'
import { TActivity } from '../../types/index'

type FormComponentProps = {
    dispatch: React.Dispatch<ActivityActions>,
    state: ActivityState
}

const initialState: TActivity = {
    id: uuidV4(),
    category:1,
    name:'',
    calories: 0
}
const FormComponent = ({dispatch, state}: FormComponentProps) => {

  const [activity, setActivity] = useState<TActivity>(initialState)

  React.useEffect(() => {
    if(state.activeId) {
        const selectedActivity = state.activities.filter( stateRef => stateRef.id ===state.activeId)[0]
        setActivity(selectedActivity)
    }
  }, [state.activeId])
  
  
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement> ) => {
     
    const isNumberField = ['category','calories'].includes(event.target.id)

     setActivity({
        ...activity,
        [event.target.id]: isNumberField ? +event.target.value : event.target.value
    })

  }

  const isValidActivity = () => {
      const {name, calories} = activity
      return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            dispatch({
                type:'save-activity',
                payload: {newActivity: activity}
            })
            setActivity({
                ...initialState,
                id: uuidV4()
            })
  }

  return (
    <form onSubmit = {handleSubmit}
        className='space-y-5 bg-white shadow p-10 rounded-lg'
    >
        <div className='grid grid-cols-1 gap-3'>
            <label htmlFor="category" className='font-bold'>Categoria:</label>
            <select id='category'
                className='border vorder-slate-300 p-2 rounded-ls w-full bg-white'
                value={activity.category}
                onChange={handleChange}
           >
                {categories.map(categoryRef => (
                    <option key={categoryRef.id} value={categoryRef.id}>{categoryRef.name}</option>
                ) )}
            </select>
        </div>
        <div className='grid grid-cols-1 gap-3'>
             <label htmlFor='name' className='font-bold'>Actividad:</label>
             <input id='name' type='text' className='border-slate-300 p-2 rounded-lg'
                placeholder= 'Ej. Comida, jugo de naranja, esalada, ejercicio, pesas'
                value={activity.name}
                onChange={handleChange}
            />
        </div>
        <div className='grid grid-cols-1 gap-3'>
             <label htmlFor='calories' className='font-bold'>Calorias:</label>
             <input id='calories' type='number' className='border-slate-300 p-2 rounded-lg'
                placeholder= 'Ej. 300 o 500'
                value={activity.calories}
                onChange={handleChange}
             />
        </div>
        <input type="submit"
            className='bg-gray-800 hove:bg-gray-900 w-full p-2 
            font-bold uppercase text-white cursor-pointer
            disabled:opacity-10'
             value={activity.category ===1? 'Guardar comida':'Guardar ejercicio'}
             disabled={!isValidActivity()}
        />
    </form>
  )
}

export default FormComponent