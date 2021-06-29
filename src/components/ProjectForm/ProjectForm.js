import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './ProjectForm.css';

const ProjectForm = (props) => {
    const id = useSelector(state => state.currentProject); //To find if project is to be edited or added
    const project = useSelector(state => state.projects.find(project => project.id === id));

    const dispatch = useDispatch();
    // Title
    const [title, setTitle] = useState(id ? project.title : '');

    // Checking if title field was touched and if it's valid or not
    const [titleWasTouched, setTitleWasTouched] = useState(false);

    const titleIsValid = title.trim() !== '';
    const titleHasError = titleWasTouched && !titleIsValid;

    //Description
    const [description, setDescription] = useState(id ? project.description : '');

    //Doing the validation for description (Custom hooks can also be used here to escape code repetition)

    const [descriptionWasTouched, setDescriptionWasTouched] = useState(false);

    const descriptionIsValid = description.trim().length >= 150;
    const descriptionHasError = descriptionWasTouched && !descriptionIsValid;

    //Images
    const [images, setImages] = useState(id ? [...project.images] : []);
    const imageFileInput = useRef(null);
    // console.log(title,description,images,id);
    //Checking Overall form validity and enabling submit button accordingly
    let isFormValid = false;

    if (titleIsValid && descriptionIsValid) isFormValid = true;

    //Title handler
    const onTitleChangeHandler = (event) => {
        setTitle(event.target.value);
    }

    const onTitleBlurHandler = () => {
        setTitleWasTouched(true);
    }

    //Description Handlers
    const onDescriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }

    const onDescriptionBlurHandler = () => {
        setDescriptionWasTouched(true);
    }

    //Image Handlers
    const onImageUploadHandler = () => {
        imageFileInput.current.click();
    }

    const onFileChangeHandler = (event) => {
        setImages(prevState => prevState.concat(Object.values(event.target.files)));
    }

    const onDeleteImageHandler = (i)=>{
        setImages(prevState=>prevState.filter((image,index)=>index!==i));
    }

    const onFormSubmitHandler = (event) => {
        event.preventDefault();

        if (!isFormValid) return;

        const payload = { id, title, description, images };

        !id ?
            dispatch({ type: 'ADD_PROJECT', payload })
            :
            dispatch({ type: 'EDIT_PROJECT', payload });

        dispatch({ type: 'DESELECT_PROJECT' });
        props.history.push('/');
    }

    const onGoBackHandler = () => {
        props.history.goBack();
    }

    const titleFieldClasses = titleHasError
        ? 'form-page__form__title invalid'
        : 'form-page__form__title';

    const descriptionFieldClasses = descriptionHasError
        ? 'form-page__form__desc invalid'
        : 'form-page__form__desc';

    return (
        <div className="form-page">
            <form className="form-page__form" onSubmit={onFormSubmitHandler}>
                <div className={titleFieldClasses}>
                    <label htmlFor='title'>Project Title</label>
                    <input
                        type='text'
                        id='title'
                        value={title}
                        onChange={onTitleChangeHandler}
                        onBlur={onTitleBlurHandler}
                    />
                    {titleHasError && (
                        <p className="form-page__error-text">Title is required</p>
                    )}
                </div>

                <div className={descriptionFieldClasses}>
                    <label htmlFor='description'>Project Description</label>
                    <textarea
                        id='description'
                        value={description}
                        onChange={onDescriptionChangeHandler}
                        onBlur={onDescriptionBlurHandler}
                    />
                    {descriptionHasError && (
                        <p className="form-page__error-text">Description must be at least 150 characters long</p>
                    )}
                </div>

                <div className="form-page__form__images">
                    {/* Not adding drag and drop for now */}
                    <input
                        type="button"
                        onClick={onImageUploadHandler}
                        value={
                            images.length ?
                                `Upload more or delete images by clicking on them`
                                :
                                'Click here to upload Images'
                        }
                    />
                    <input
                        type='file'
                        id='images'
                        multiple
                        ref={imageFileInput}
                        onChange={onFileChangeHandler}
                    />
                    <div className="current__images">
                        {images.map((image, i) => {
                             return (
                                <img alt='Project'
                                    src={URL.createObjectURL(image)}
                                    className="current__images__image"
                                    onClick={()=>onDeleteImageHandler(i)}
                                    key={i}
                                />
                            )
                        })}
                    </div>
                </div>

                <div className="form-page__form__buttons">
                    <input
                        className="form-page__form__back"
                        type="button"
                        onClick={onGoBackHandler}
                        value="Back"
                    />
                    <button className="form-page__form__submit" disabled={!isFormValid} type="submit">
                        {id ? 'Edit Project' : 'Add Project'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProjectForm;