import React from 'react';
import './css/ToDo.css';

class TodoApp extends React.Component {

    constructor(props) {
      super(props);
      
      this.state = {
        tasks: [],
        description: ""
      };
      
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleAddTask = this.handleAddTask.bind(this);
      this.markTaskCompleted = this.markTaskCompleted.bind(this);
      this.handleDeleteTask = this.handleDeleteTask.bind(this);
    }
    handleTextChange(event) {
      this.setState({
        description: event.target.value
      });
    }
    handleAddTask(event) {
      event.preventDefault();
      
      let newTask = {
        id: Date.now(),
        description: this.state.description,
        done: false
      };
      
      this.setState((prevState) => ({
        tasks: prevState.tasks.concat(newTask),
        description: ""
      }));
    }
    markTaskCompleted(itemId) {
      let updatedTasks = this.state.tasks.map(task => {
        if (itemId === task.id)
            task.done = !task.done;
        return task;
      });
      
      this.setState({
        tasks: [].concat(updatedTasks)
      });
    }
    handleDeleteTask(taskId) {
      let updatedTasks = this.state.tasks.filter(task => {
        return task.id !== taskId;
      });
      
      this.setState({
        tasks: [].concat(updatedTasks)
      });
    }
    render() {
      return (
        <div className="todo-app">
          <h3 className="apptitle">MY TO DO LIST</h3>
          <form className="row">
            <div className="">
              <input type="text" className="form-control" placeholder="Add new task" onChange={this.handleTextChange} value={this.state.description} />
              <button className="btn btn-primary"  onClick={this.handleAddTask}>+</button>
            </div>
          </form>
          <div className="row">
            <div className="">
              <TodoList tasks={this.state.tasks} onItemCompleted={this.markTaskCompleted} ondeleteTask={this.handleDeleteTask} />
            </div>
          </div>
        </div>
      );
    }
  }
  
  class TodoItem extends React.Component {
    constructor(props) {
      super(props);
      this.markCompleted = this.markCompleted.bind(this);
      this.deleteTask = this.deleteTask.bind(this);
    }
    markCompleted(event) {
      this.props.onItemCompleted(this.props.id);
    }
    deleteTask(event) {
      this.props.ondeleteTask(this.props.id);
    }
    componentDidMount() {
      if (this._listItem) {
        this._listItem.classList.add("highlight");
  
        setTimeout((listItem) => {
          listItem.classList.remove("highlight");
        }, 500, this._listItem);
      }
    }
    render() {
      let taskClass = "form-check-label form-check todoitem " + (this.props.completed ? "done" : "undone");
      return (
        // <li className={taskClass} ref={li => this._listItem = li }>
        <li  ref={li => this._listItem = li }>
          <label className={taskClass}>
            <input type="checkbox" className="form-check-input" onChange={this.markCompleted} /> {this.props.description}
          </label>
          <button type="button" className="btn" onClick={this.deleteTask}>x</button>
        </li>
      );
    }
  }
  
  class TodoList extends React.Component {
    render() {
      return (
        <ul className="todolist">
          {this.props.tasks.map(task => (
            <TodoItem task={task.id} id={task.id} description={task.description} completed={task.done} onItemCompleted={this.props.onItemCompleted} ondeleteTask={this.props.ondeleteTask} />
          ))}
        </ul>
      );
    }
  }

export default TodoApp;