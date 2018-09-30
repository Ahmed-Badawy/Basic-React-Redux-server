import React from 'react';

class ResultsTable extends React.Component{
    render(){
        return (
            <div className='table-responsive'>
                <table className='table table-striped table-bordered table-hover table-sm'>
                    <thead className='thead-dark'>
                        <tr>
                            <th>#</th>
                            <th>Place</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Area</th>
                            <th>City</th>
                            <th>Other Info</th>
                            {/* <th>Outer</th>
                            <th>Inner</th>
                            <th>FullWindow</th>
                            <th>FastMail</th>
                            <th>NightShift</th>
                            <th>POS</th>
                            <th>ATM</th> */}
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

export default ResultsTable;