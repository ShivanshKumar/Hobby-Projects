import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Home.css';
import ProjectCard from './ProjectCard/ProjectCard';

const Home = () => {
    const projects = useSelector(state => state.projects);
    const notification = useSelector(state => state.notification);

    const dispatch = useDispatch();

    const ProjectCards = projects.length ? projects.map(project => <ProjectCard key={project.id} id={project.id} />) : null;

    useEffect(() => {
        setTimeout(() => {
            dispatch({ type: 'STOP_NOTIFICATION' });
        }, 3000)
    }, [notification, dispatch])

    return (
        <div>
            {
                notification ?
                    <section className="notifications">
                        <h2>
                            {notification} Project Successfully
                        </h2>
                    </section> :
                    null
            }
            <div className="project-header">
                <div className="project-header__title">
                    <span>Projects</span>
                </div>
                <NavLink to='/project-form'>
                    <button className="project-header__button">Add Projects</button>
                </NavLink>
            </div>

            <div className="project-cards" style={!projects.length?{alignItems:'center', justifyContent:'center'}:{}}>
                {ProjectCards}
                <div className="project__add-card">
                    <NavLink to='/project-form'>
                        <button className="project__add-card__button">
                            <img className="project__add-card__img" src="/add.svg" alt="add"/>
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Home;