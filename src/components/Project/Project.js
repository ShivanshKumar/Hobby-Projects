import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Project.css';

const Projects = (props) => {
    const id = useSelector(state => state.currentProject);
    const project = useSelector(state => state.projects.find(project => project.id === id));
    const dispatch = useDispatch();

    useEffect(() => {
        if (!project) {
            props.history.push('/');
        }
    }, [project, props.history])

    const onDeleteProjectHandler = () => {
        dispatch({ type: 'DELETE_PROJECT', payload: { id: project.id } });
        dispatch({ type: 'DESELECT_PROJECT' });
    }

    const onAllProjectsHandler = () => {
        dispatch({ type: 'DESELECT_PROJECT' });
    }

    return (
        <>
            {project ?
                <div className="project">
                    <img alt='Project'
                        src={project.images[0] ? URL.createObjectURL(project.images[0]):'/project-management.svg'}
                        className={project.images[0] ? "project__main-image": "project__no-image"} //Handling if user doesn't add any image
                    /> {/*Using the first image*/}
                    <div className="project__head-wrapper">
                        <div className="project__title">
                            <span>{project.title}</span>
                        </div>
                        <div className="project__links">
                            <NavLink to='/'>
                                <button
                                    className="project__links__home"
                                    onClick={onAllProjectsHandler}
                                >
                                    Go to all projects
                                </button>
                            </NavLink>

                            <NavLink to='/project-form'>
                                <button className="project__links__edit">Edit Project</button>
                            </NavLink>
                        </div>
                    </div>

                    <div className="project__desc">
                        <span>Description:</span>
                        <p>{project.description}</p>
                    </div>
                    <div className="project__images__wrapper">
                        {project.images.length > 1 ? <span className="project__images__title">More Images:</span> : null}
                        <div className="project__images">
                            {project.images.map((image, i) => {
                                if (i !== 0) return (
                                    <img alt='Project'
                                        src={URL.createObjectURL(image)}
                                        className="project__images__image"
                                        onClick={() => window.open(URL.createObjectURL(image))}
                                        key={i}
                                    />
                                )
                                else return null;
                            })}
                        </div>
                    </div>
                    <div className="project__delete">
                        <button onClick={onDeleteProjectHandler}>Delete Project</button>
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default Projects;