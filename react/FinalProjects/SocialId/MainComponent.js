import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';



let states_ids = {
    "01" : "القاهرة",
    "02" : "الإسكندرية",
    "03" : "بور سعيد",
    "04" : "السويس",
    "11" : "دمياط",
    "12" : "الدقهلية",
    "13" : "الشرقية",
    "14" : "القليوبية",
    "15" : "كفر الشيخ",
    "16" : "الغربية",
    "17" : "المنوفية",
    "18" : "البحيرة",
    "19" : "الإسماعيلية",
    "21" : "الجيزة",
    "22" : "بنى سويف",
    "23" : "الفيوم",
    "24" : "المنيا",
    "25" : "أسيوط",
    "26" : "سوهاج",
    "27" : "قنا",
    "28" : "أسوان",
    "29" : "الأقصر",
    "31" : "البحر الأحمر",
    "32" : "الوادى الجديد",
    "33" : "مطروح",
    "34" : "شمال سيناء",
    "35" : "جنوب سيناء",
    "88" : "خارج الجمهورية"
}


function calculateAge(birthday) { // birthday is a date
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    let years = Math.abs(ageDate.getUTCFullYear() - 1970);
    let months = Math.abs();
    return years;
}



class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    socialIdData(social_id){
        social_id = String(social_id);
		let output = {};
		if(social_id.length == 14) {
			if(social_id[0] == 1) output.mel = '18';
			else if(social_id[0] == 2) output.mel = '19';
			else if(social_id[0] == 3) output.mel = '20';

			output.year = social_id[1]+social_id[2];
			output.month = social_id[3]+social_id[4];
			output.day = social_id[5]+social_id[6];
			output.age = calculateAge(new Date(output.mel+output.year,output.month-1,output.day));

			output.cState = states_ids[ social_id[7]+social_id[8] ];

			output.id = social_id[9]+social_id[10]+social_id[11]+social_id[12]+social_id[13];
			output.type = (social_id[12]%2 == 1) ? 'ذكر' : 'إنثى';

			let sep = "-";
			output.birth_date = output.mel+output.year+sep+output.month+sep+output.day;
        }
        // console.log(output);
        return output;
    }

    handleChange(e){
        e.preventDefault();
        let value = e.target.value;
        let output = this.socialIdData(value);
        this.props.dispatch( { type:"ActionOne",data:{output_data: output} } );
    }

    render() {
        let outputTable = (
            <table className="table table-bordered table-hover table-striped">
                <tbody>
                    <tr className="text-center"><td>{this.props.output_data.id}</td><th className="text-center">رقم الكود</th></tr>
                    <tr className="text-center"><td>{this.props.output_data.cState}</td><th className="text-center">محافظة</th></tr>
                    <tr className="text-center"><td>{this.props.output_data.birth_date}</td><th className="text-center">تاريخ الميلاد</th></tr>
                    <tr className="text-center"><td>{this.props.output_data.type}</td><th className="text-center">الجنس</th></tr>
                    <tr className="text-center"><td dir="rtl">{this.props.output_data.age} سنة</td><th className="text-center">العمر الحالى</th></tr>
                </tbody>
            </table>  
        )
        return (
            <div className='container'>
                <h1>Social ID Analyzer</h1>
                <form>
                    <input type='number' onChange={this.handleChange} value={this.props.field} />
                </form>
                { (!this.props.output_data.id) && 
                    <h4 className="alert alert-info" dir="rtl">
                    من فضلك أكتب الرقم القومى المراد تحليله. وهو رقم البطاقة المكون من 14 أسفل الصورة الشخصية فى البطاقة. <br /> مثلا للرقم القومى: <small>29007111600035-----26407081601748</small>
                    </h4>
                }
                <hr />
                { (this.props.output_data.id) && outputTable }
            </div>
        )
    }
}

MainComponent.propTypes = {
    // field: PropTypes.number.isRequired
}

export default connect((state, props) => {
    return {
        output_data: state.output_data,
    }
  })(MainComponent);
