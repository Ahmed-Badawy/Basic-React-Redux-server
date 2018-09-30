import React from 'react';

let fuelTypes = {
    80: 5.5,
    92: 6.75,
    95: 7.75,
    kerosene: 5.5,
    solar: 5.5,
    gas: 2.75
};

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type:80,
            amount:0,
            price:0
        }
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    handleTypeChange(e){
        e.preventDefault();
        let value = e.target.value;
        let price = (this.state.amount * fuelTypes[value]).toFixed(2);
        this.setState({type:value,price:price,amount:this.state.amount});
    }
    handleAmountChange(e){
        e.preventDefault();
        let value = e.target.value;
        let price = (value * fuelTypes[this.state.type]).toFixed(2);
        this.setState({amount:value, price:price});
    }
    handlePriceChange(e){
        e.preventDefault();
        let value = e.target.value;
        let amount = (value / fuelTypes[this.state.type]).toFixed(2);
        this.setState({price:value, amount:amount});
    }

    render() {
        return (
            <div className='container'>
                <h1>Fuel Calculator</h1>
                <form>
                    <div className="form-row">
                        <div className="col-sm-12">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend"> <div className="input-group-text">نوع الوقود / Fuel Type</div> </div>
                                <select className="form-control" placeholder="Choose Fuel Type" onChange={this.handleTypeChange} value={this.state.type}>
                                    <option value="80">بنزين 80</option>
                                    <option value="92">بنزين 92</option>
                                    <option value="95">بنزين 95</option>
                                    <option value="kerosene">الكيروسين</option>
                                    <option value="solar">سولار</option>
                                    <option value="gas">الغاز بالمتر المكعب</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend"> <div className="input-group-text">كمية الوقود بالليتر</div> </div>
                                <input type="number" className='form-control' placeholder="Enter Number" onChange={this.handleAmountChange} value={this.state.amount} />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="input-group mb-2">
                                <div className="input-group-prepend"> <div className="input-group-text">ثمن الوقود بالجينه</div> </div>
                                <input type="number" className='form-control' placeholder="Enter Number" onChange={this.handlePriceChange} value={this.state.price}/>
                            </div>
                        </div>
                    </div>
                </form>                
            </div>
        )
    }
}

export default MainComponent;
