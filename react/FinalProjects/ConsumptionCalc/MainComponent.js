import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';


let ElecCon = {
    "2016Home": [
            { min: 0, max: 50, price: 7.5, added: 1 },
            { min: 50, max: 100, price: 14.5, added: 1.5 },
            { min: 0, max: 200, price: 16, added: 3 },
            { min: 200, max: 350, price: 35, added: 5 },
            { min: 350, max: 650, price: 44, added: 7 },
            { min: 650, max: 1000, price: 71, added: 10 },
            { min: 1000, max: 9999999999, price: 81, added: 15, exception:"fromZero" },
    ],
    "2017Home":[
            { min: 0, max: 50, price: 13},
            { min: 50, max: 100, price: 22},
            { min: 0, max: 200, price: 27},
            { min: 200, max: 350, price: 55},
            { min: 350, max: 650, price: 75},
            { min: 650, max: 1000, price: 125 },
            { min: 1000, max: 9999999999, price: 135, exception:"fromZero" },
    ],
    "2018Home":[
            { min: 0, max: 50, price: 22, added: 1 },
            { min: 50, max: 100, price: 30, added: 2 },
            { min: 0, max: 200, price: 36, added: 6 },
            { min: 200, max: 350, price: 70, added: 11 },
            { min: 350, max: 650, price: 90, added: 15 },
            { min: 650, max: 1000, price: 135, added: 25 },
            { min: 1000, max: 9999999999, price: 145, added: 40, exception:"fromZero" },
    ],
    "2018Commercial":[
            { min: 0, max: 100, price: 55, added: 5 },
            { min: 0, max: 250, price: 100, added: 15 },
            { min: 0, max: 600, price: 115, added: 20 },
            { min: 601, max: 1000, price: 145, added: 25 },
            { min: 1000, max: 9999999999, price: 150, added: 40, exception:"fromZero" },
    ],
    "2017HomeWater":[
        { min: 0, max: 10, price: 45 },
        { min: 10, max: 20, price: 120 },
        { min: 20, max: 30, price: 165 },
        { min: 30, max: 40, price: 200 },
        { min: 40, max: 9999999999, price: 225 },
        
    ],
    "2018HomeWater":[
        { min: 0, max: 10, price: 65 },
        { min: 10, max: 20, price: 160 },
        { min: 20, max: 30, price: 225 },
        { min: 30, max: 40, price: 275 },
        { min: 40, max: 9999999999, price: 315 },
        
    ],
}


class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.changeConsumption = this.changeConsumption.bind(this);
        this.changeConsumptionType = this.changeConsumptionType.bind(this);
        this.calcConsumption = debounce(this._calcConsumption,300);        
    }

    changeConsumption(e){
        e.preventDefault();
        let value = e.target.value;
        this.props.dispatch( {type:"changeConsumption",data:{consumption:value}} );
        this.calcConsumption();
    }
    changeConsumptionType(e){
        e.preventDefault();
        let value = e.target.value;
        this.props.dispatch( {type:"changeConsumptionType",data:{consumptionType:value}} );
        this.calcConsumption();
    }

    _calcConsumption(){
        let consumption = this.props.consumption;
        if(!consumption) return;
        let consumptionArray = ElecCon[this.props.consumptionType];
        let accumulative = [], totalCost = 0, addedCost = 0;
        for(let i=0; i<consumptionArray.length-1 ;i++){
            let item = consumptionArray[i];
            if(item.min==0){ accumulative = []; totalCost = 0 }
            if(consumption>item.min && consumption<item.max){ 
                let lastSlice = consumption - item.min;
                new_obj = {...item,diff:lastSlice,cost:lastSlice*item.price/100};
                accumulative.push(new_obj);
                totalCost += new_obj.cost;                
                if(item.added) addedCost = item.added;
                break; 
            }
            let diff = item.max-item.min;
            let new_obj = {...item,diff:diff,cost:diff*item.price/100};
            accumulative.push(new_obj);
            totalCost += new_obj.cost;
        }
        console.log(totalCost,addedCost,accumulative);
        this.props.dispatch({type:"updateResults",data:{totalCost,addedCost,accumulative}})
    }

    render() {
        let unit =  (["2018HomeWater","2017HomeWater"].includes(this.props.consumptionType)) ? "متر مكعب" : "كيلو وات";
        let type =  (["2018HomeWater","2017HomeWater"].includes(this.props.consumptionType)) ? "water" : "elec";
        return (
            <div className='container'>
                <h1>Consumption Calculator</h1>
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="consumptionType">نوع الإستهلاك</label>
                            <select id="consumptionType" className="form-control" onChange={this.changeConsumptionType} value={this.props.consumptionType} >
                                <optgroup label="إستهلاك كهرباء">
                                    <option value="2018Home"> كهرباء منزلى لتعديلات 2018</option>
                                    <option value="2018Commercial">كهرباء تجارى لتعديلات 2018</option>
                                    <option value="2017Home">كهرباء منزلى لتعديلات 2017</option>
                                    <option value="2016Home">كهرباء منزلى لتعديلات 2016</option>
                                </optgroup>
                                <optgroup label="إستهلاك مياه">                                
                                    <option value="2018HomeWater"> مياه منزلى لتعديلات 2018</option>
                                    <option value="2017HomeWater"> مياه منزلى لتعديلات 2017</option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="consumption">الكمية المستهلكة بال {unit}</label>
                            <input type="number" id="consumption" className="form-control" onChange={this.changeConsumption} value={this.props.consumption} />
                        </div>
                    </div>                    
                </form>  
                <hr />
                { (type=="water") ? 
                     (<WaterComp 
                        addedCost={this.props.addedCost}
                        totalCost={this.props.totalCost}
                        accumulative={this.props.accumulative}
                    />)
                :  (<ElectricComp 
                    addedCost={this.props.addedCost}
                    totalCost={this.props.totalCost}
                    accumulative={this.props.accumulative}
                />)
                }

            </div>
        )
    }
}

let WaterComp = (props)=>{
    let healthCare = ( props.totalCost * .75 ).toFixed(2);
    const listItems = props.accumulative.map((item,index) => <li key={index}> عدد {item.diff} كيلو وات  فى الشريحة ({item.min} حتى {item.max} كيلو وات بـ {item.price} قرشا) بتكلفة كلية : {item.cost} جنيها </li> );    
    return (
        <div>
            <h3>تفاصيل إستهلاك المياه</h3>
            <ul>
                {listItems}
                {props.addedCost > 0 && <li> قيمة مضافة على إستهلاك الشريحة و قدرها: {props.addedCost} جنيها </li> }
            </ul>
            <h5>تكلفة الاستهلاك الكلية: {props.totalCost} جنيها</h5>
            <span>
                <h5>الصرف الصحى 75% على فاتورة المياه: {healthCare} جنيها</h5>
                <h5>المجموع: {props.totalCost + parseInt(healthCare) } جنيها</h5>
            </span>
        </div>        
    )
}

let ElectricComp = (props)=>{
    const listItems = props.accumulative.map((item,index) => <li key={index}> عدد {item.diff} كيلو وات  فى الشريحة ({item.min} حتى {item.max} كيلو وات بـ {item.price} قرشا) بتكلفة كلية : {item.cost} جنيها </li> );    
    return (
        <div>
            <h3>تفاصيل إستهلاك الكهرباء</h3>
            <ul>
                {listItems}
                {props.addedCost > 0 && <li> قيمة مضافة على إستهلاك الشريحة و قدرها: {props.addedCost} جنيها </li> }
            </ul>
            <h5>تكلفة الاستهلاك الكلية: {props.totalCost} جنيها</h5>
            {props.addedCost > 0 && <span><h5>خدمات إخرى: {props.addedCost} جنيها</h5>
            <h5>المجموع: {props.totalCost + props.addedCost} جنيها</h5></span>}
        </div>        
    )
}

MainComponent.propTypes = {
    // field: PropTypes.number.isRequired
}

export default connect((state, props) => {
    return {
        consumptionType: state.consumptionType,
        consumption: state.consumption,
        accumulative: state.accumulative,
        addedCost: state.addedCost,
        totalCost: state.totalCost,
    }
  })(MainComponent);
