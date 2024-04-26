import { TActivity } from "../types/index"

export type ActivityActions = 
{ type: 'save-activity', payload: {newActivity: TActivity}} |
{ type: 'set-activeId', payload: {id: TActivity['id']}} |
{ type: 'delete-activity', payload: {id: TActivity['id']}} |
{ type: 'restart-app'} 

export type ActivityState = {
    activities: TActivity[],
    activeId: TActivity['id']
}

const localStorageActivities = () : TActivity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities): []
}
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}
export const ActivityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        
        let updatedActivities: TActivity[] = []

        if (state.activeId) {
            updatedActivities = 
                state.activities.map(act => act.id === state.activeId 
                                        ? action.payload.newActivity
                                        : act )
        } else {
            updatedActivities = [...state.activities,action.payload.newActivity]
        }
       return {
           ...state,
           activities: updatedActivities,
           activeId: ''
       }
    }
    if (action.type === 'set-activeId') {
       return {
           ...state,
           activeId: action.payload.id

       }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activityRef => activityRef.id !== action.payload.id)
        }
    }

    if (action.type === 'restart-app') {
        return {
           activities: [],
           activeId: ''
        }
    }
    return state
}
