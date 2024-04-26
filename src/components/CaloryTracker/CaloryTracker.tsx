import { useMemo } from "react"
import type{ TActivity } from "../../types/index"
import CaloryDisplayComponent from "../CaloryDisplay/CaloryDisplay"

type CaloryTrackerComponentProps = {
    activities: TActivity[]
}
const CaloryTrackerComponent = ({activities}: CaloryTrackerComponentProps) => {
  

 const activitiesReduce = (valor:number) => activities.reduce((total, activity) => activity.category===valor? total + activity.calories:total,0 )

  // contadores 
  const caloriesConsumed = useMemo(() =>activitiesReduce(1), [activities])
  const caloriesReceipt = useMemo(() =>activitiesReduce(2), [activities])
  const netCalories = useMemo(() => caloriesConsumed-caloriesReceipt, [activities])
    return (
    <>
        <h2 className= 'text-4xl font-black text-white text-center'>
            Resumen de Calorias
        </h2>
        <div className='flex flex-col item-center md:flex-row md:justify-between gap-5 ,t-10'>
            <CaloryDisplayComponent calories={caloriesConsumed} text={'Consumidas'}/>
            <CaloryDisplayComponent calories={caloriesReceipt} text={'Quemadas'}/>
            <CaloryDisplayComponent calories={netCalories} text={'Diferencia'}/>
        </div>

        
    </>
  )
}

export default CaloryTrackerComponent