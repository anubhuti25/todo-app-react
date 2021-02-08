import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { createTodo, getTodo } from '../../actions/profile';
import { EXISTING_BATCH, NEW_BATCH } from '../../actions/types';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
const initialState = {
    title: '',
    description: '',
    fromDate: '',
    toDate: '',
    isCompleted: 0,
    batch: '',
    batchName: '',
    newBatch: false
};

const CreateTodo = ({ createTodo, getTodo, isAuthenticated, profile: { todosBatch, todo, loading }, history, match }) => {

    const [formData, setFormData] = useState(initialState);

    useEffect(() => {
        if (match.params.id && !todo) {
            getTodo(match.params.id);
        }

        if (!loading && todo) {
            const todoData = { ...initialState };
            for (const key in todo) {
                if (key in todoData) todoData[key] = todo[key];
            }
            setFormData(todoData);
        }
    }, [match.params.id, getTodo, loading, todo]);

    const { title, description, fromDate, toDate, batch, batchName } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    if(loading) {
        return <Spinner />
    }

    return (
        <div className="column">
            <h1 className="large text-primary">{ todo? 'Update ' : 'Add a new '} Todo</h1>
            <form
                className="form"
                onSubmit={e => {
                    e.preventDefault();
                    if(batch === NEW_BATCH){
                        formData.batch = batchName;
                        formData.newBatch = true;
                    }
                    else formData.newBatch = false;
                    createTodo(formData, match.params.id, history, todo !== null);
                }}
            >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <textarea
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={e => onChange(e)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <select value={batch} name="batch" onChange={onChange} required>
                        <option value={EXISTING_BATCH}>Select a batch</option>
                        <option value={NEW_BATCH}>Add a new batch</option>
                        {
                            todosBatch.map(batch => (
                                <option key={batch.batch_id} value={batch.batch_id}>{batch.batch_name}</option>
                            ))
                        }
                    </select>
                </div>

                {
                    batch === NEW_BATCH &&
                    <Fragment>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Batch name"
                                name="batchName"
                                value={batchName}
                                onChange={onChange}
                                required
                            />
                        </div>
                    </Fragment>
                }

                <div className="form-group">
                    <h4>From Date</h4>
                    <input required type="date" name="fromDate" value={fromDate} onChange={onChange} />
                </div>

                <div className="form-group">
                    <h4>To Date</h4>
                    <input required type="date" name="toDate" value={toDate} onChange={onChange} />
                </div>

                <input
                    type="submit"
                    className="btn btn-primary"
                    value={todo ? "Update" : "Create" }
                />
                <Link className="btn btn-primary" to="/">
                    Cancel
                </Link>
            </form>
        </div>
    )
}

CreateTodo.prototypes = {
    createTodo: PropTypes.func.isRequired,
    getTodo: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.profile
});

export default connect(mapStateToProps, { createTodo, getTodo })(CreateTodo)
