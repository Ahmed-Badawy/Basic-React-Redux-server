import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from "moment";


let ft = time=>{
    return time.format("h:mm a");
}
let calculate_start_end_times = startTime=>{
    let end_times_array = [];
    for(let i in [1,2,3]){
        const newTime = startTime.add(30,"minutes");
        end_times_array.push( newTime )
        console.log(ft(newTime));
    }
    console.log(end_times_array);
    for(let i of end_times_array){
        console.log(ft(i));
    }
}
calculate_start_end_times(moment());
let startTime = moment();
console.log("Start Time: ",ft(startTime));



class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleLessonsNumChange = this.handleLessonsNumChange.bind(this);
        this.handleMinutesPerLessonChange = this.handleMinutesPerLessonChange.bind(this);
    }

    handleLessonsNumChange(e){
        e.preventDefault();
        let value = e.target.value;
        this.props.dispatch( {type:"changeLessonsNum",data:{lessonsNum:value}} );
    }
    handleMinutesPerLessonChange(e){
        e.preventDefault();
        let value = e.target.value;
        this.props.dispatch( {type:"changeMinutesPerLesson",data:{minutesPerLesson:value}} );
    }



    render() {
        return (
            <div className='container'>
                <h1>Course Timer</h1>
                <form>
                    <div className="form-group row">
                        <label htmlFor="LessonsNum" className="col-sm-6 col-form-label">Number Of Lessons</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" id="LessonsNum" placeholder="col-form-label" onChange={this.handleLessonsNumChange} value={this.props.lessonsNum} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="minutesPerLesson" className="col-sm-6 col-form-label">How Many Minutes per Lesson</label>
                        <div className="col-sm-6">
                            <input type="number" className="form-control" id="minutesPerLesson" placeholder="col-form-label" onChange={this.handleMinutesPerLessonChange} value={this.props.minutesPerLesson} />
                        </div>
                    </div>
                </form>       

                {this.LessonsTable()}         
            </div>
        )
    }

    LessonsTable(){
        return (<div>
           <table className="table">
            <thead>
                <tr>
                <th scope="col"># Lesson Num</th>
                <th scope="col">Starts At</th>
                <th scope="col">Ends At</th>
                <th scope="col">Progress</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">
                    1
                    <button className="btn btn-sm btn-outline-primary"><i className='fa fa-play'></i></button>
                    <button className="btn btn-sm btn-outline-warning"><i className='fa fa-pause'></i></button>
                </th>
                <td>5:11 PM</td>
                <td>5:33 PM</td>
                <td>
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{width: '75%'}} />
                    </div>

                </td>
                </tr>
                <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                </tr>
                <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                </tr>
            </tbody>
            </table>

        </div>)
    }
}

MainComponent.propTypes = {
    // field: PropTypes.number.isRequired
    lessonsNum: PropTypes.number.isRequired,
    minutesPerLesson: PropTypes.number.isRequired,
}

export default connect((state, props) => {
    return {
        lessonsNum: state.lessonsNum,
        minutesPerLesson: state.minutesPerLesson
    }
  })(MainComponent);
