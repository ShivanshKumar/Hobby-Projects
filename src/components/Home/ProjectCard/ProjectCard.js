import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

import './ProjectCard.css';

const ProjectCard = (props) => {
    const dispatch = useDispatch();
    const project = useSelector(state => state.projects.find(project => project.id === props.id));

    const onDeleteProjectHandler = () => {
        dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } });
    }

    const onViewProjectHandler = () => {
        dispatch({ type: 'SELECT_PROJECT', payload: { id: project.id } });
    }
    return (
        <div className="card">
            <img
                alt='Project'
                className="card__image"
                src={project.images[0] && URL.createObjectURL(project.images[0])}
            /> {/*Using the first image*/}
            <div className="card__body">
                <div className="card__body__details">
                    <div className="card__body__title">
                        <span>{project.title}</span>
                    </div>

                    <NavLink to='/project'>
                        <button
                            className="card__body__view-button"
                            onClick={onViewProjectHandler}
                        >
                            View Project
                        </button>
                    </NavLink>
                </div>
                <div className="card__delete">
                    <button
                        className="card__body__del-button"
                        onClick={onDeleteProjectHandler}
                    >
                        <img src="/dustbin.svg" alt="delete" />
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProjectCard;