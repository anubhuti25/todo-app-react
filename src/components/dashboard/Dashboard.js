import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentTodos } from '../../actions/profile';
import Todos from './Todos';
import { BATCH_ALL, BATCH_COMPLETE, BATCH_INCOMPLETE } from '../../actions/types';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentTodos, auth: { isAuthenticated, user }, profile: { todosBatch, loading } }) => {
    useEffect(() => {
        getCurrentTodos();
    }, [getCurrentTodos]);

    const [batchFilter, setBatchFilter] = useState(BATCH_ALL);

    if(loading || (!todosBatch) || (todosBatch.length === 0)) {
        return <Spinner />
    }

    return (
        <Fragment>
            <div className="dashboard-header">
                <h1 className="large text-primary">Welcome back { !loading && user ? user.name : '' } !</h1>
                <span className="spacer"></span>
                <Link to="/create-todo" className="create-todo"><i className="material-icons">add_circle_outline</i>Add Todo</Link>
                <span>
                    <button 
                        onClick={()=>setBatchFilter(BATCH_ALL)}
                        className={"btn " + ( batchFilter === BATCH_ALL? 'btn-primary' : 'btn-light' )}>All</button>
                    <button 
                        onClick={()=>setBatchFilter(BATCH_COMPLETE)}
                        className={"btn " + ( batchFilter === BATCH_COMPLETE? 'btn-primary' : 'btn-light' )}>Complete</button>
                    <button 
                        onClick={()=>setBatchFilter(BATCH_INCOMPLETE)}
                        className={"btn " + ( batchFilter === BATCH_INCOMPLETE? 'btn-primary' : 'btn-light' )}>Incomplete</button>
                </span>                
            </div>
            {todosBatch.map(batch => 
                batch.todos.length > 0 && 
                (
                    ( batchFilter === BATCH_COMPLETE && batch.completeCount > 0) ||
                    ( batchFilter === BATCH_INCOMPLETE && batch.inCompleteCount > 0) || 
                    ( batchFilter === BATCH_ALL )
                ) &&
                <div key={batch.batch_id} className="panel">
                    <div className="panel-header">
                        {batch.batch_name}
                    </div>
                    <div className="card-list">
                        {batch.todos.map(todo => 
                            (
                                (batchFilter === BATCH_ALL) ||
                                (batchFilter === BATCH_COMPLETE && todo.is_completed === 1) ||
                                (batchFilter === BATCH_INCOMPLETE && todo.is_completed === 0)
                            ) &&                           
                            <Todos key={todo.id + "_" + todo.is_completed} todo={todo} />)
                        }
                    </div>
                </div>

            )}
        </Fragment>
    )
}

Dashboard.propTypes = {
    getCurrentTodos: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentTodos })(Dashboard)
