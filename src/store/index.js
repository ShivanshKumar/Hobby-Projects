import { createStore } from "redux";
//Could have also used packages like @reduxjs/toolkit
//Not using any mutation check library, doing the checks myself

const initialState = { projects: [], currentProject: undefined, notification: undefined }; //Handling all the states in single slice for now

const formActionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT': {
            console.log(action)
            const projectsCopy = [...state.projects]; // For updating store in an immutable way
            projectsCopy.push({
                id: Math.floor(Math.random() * 1000),
                title: action.payload.title,
                description: action.payload.description,
                images: action.payload.images ? action.payload.images : []
            });

            return { 
                currentProject: state.currentProject , 
                projects: projectsCopy, 
                notification: 'Added'
            };
        }

        case 'EDIT_PROJECT': {
            const projectsCopy = [...state.projects];
            const projectIndex = projectsCopy.findIndex(project => project.id === action.payload.id);

            const editedProject = {
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                images: action.payload.images ? //Checking if user wants to add more images or not
                    action.payload.images
                    :
                    projectsCopy[projectIndex].images
                //Not adding the feature of deleting images as of now
            };

            projectsCopy[projectIndex] = editedProject;
            return { 
                projects: projectsCopy, 
                currentProject: state.currentProject,
                notification: 'Edited'
            }
        }

        case 'DELETE_PROJECT': {
            const projectsFiltered = state.projects.filter(project => project.id !== action.payload.id);
            return { 
                projects: projectsFiltered, 
                currentProject: state.currentProject,
                notification: 'Deleted'
            };
        }

        case 'SELECT_PROJECT': {
            return { ...state, currentProject: action.payload.id, notification: undefined };
        }

        case 'DESELECT_PROJECT': {
            return { ...state, currentProject: undefined };
        }

        case 'STOP_NOTIFICATION': {
            return {...state, notification: undefined}
        }

        default: return state;
    }
}

const store = createStore(formActionReducer);

export default store;