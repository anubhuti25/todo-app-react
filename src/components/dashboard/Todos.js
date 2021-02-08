import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTodo, toggleCompleted } from '../../actions/profile';
import formatDate from '../../utils/formatDate';

const Todos = ({ todo, deleteTodo, toggleCompleted }) => (
        <div className="card-item">
            <div className="card-header">
                {todo.title}
                <span className="spacer"></span>
                <div className="card-actions text-primary">
                    <Link to={`/edit-todo/${todo.batch_id}/${todo.id}`}>
                        <i className="material-icons">edit</i>
                    </Link>
                    <span onClick={() => deleteTodo(todo.batch_id, todo.id)}>
                        <i className="material-icons">delete</i>
                    </span>
                    <span
                        title = {todo.is_completed === 0 ? "Mark as completed" : "Mark as incomplete" }
                        className={todo.is_completed === 1 ? "text-success" : "btn-light"}
                        onClick={() => toggleCompleted(todo.batch_id, todo.id, todo.is_completed)}
                    >
                        <i className="material-icons">check_circle_outline</i>
                    </span>
                </div>
            </div>
            <div className="card-body">
                <div>{todo.description}</div>
            </div>
            <span className="spacer"></span>
            <div className="card-footer">
                <i className="material-icons">schedule</i>{' '}
                <span>{formatDate(todo.from_date)} - {formatDate(todo.to_date)}</span>
            </div>
        </div>
)

Todos.prototypes = {
    todo: PropTypes.object.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    toggleCompleted: PropTypes.func.isRequired,
}

export default connect(null, { deleteTodo, toggleCompleted })(Todos)
