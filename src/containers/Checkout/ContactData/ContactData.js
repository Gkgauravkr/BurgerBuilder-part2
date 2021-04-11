import React , {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import Classes from './ContactData.css'
import axios from '../../../Axios-Orders';
import  Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state ={
        orderForm : {
            name :{
                elementType: 'input',
                elementConfig : {
                   type: 'text',
                   placeholder: 'your Name' 
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street :{
                elementType: 'input',
                elementConfig : {
                   type: 'text',
                   placeholder: 'your Street' 
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipCode :{
                elementType: 'input',
                elementConfig : {
                   type: 'text',
                   placeholder: 'your zip Code' 
                },
                value: '',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength : 5
                },
                valid : false,
                touched : false
            },
            country :{
                elementType: 'input',
                elementConfig : {
                   type: 'text',
                   placeholder: 'your Country' 
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email :{
                elementType: 'input',
                elementConfig : {
                   type: 'text',
                   placeholder: 'Your Email' 
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig : {
                  options : [{value: '' , displayValue : 'Select'},
                      {value: 'fastest' , displayValue : 'Fastest'},
                  {value: 'cheapest' , displayValue : 'Cheapest'}
                ]
                },
                value: '',
                valid: true,
               validation : {
                    required : true
                },
               
                
            }
        },
        loading : false,
        formIsValid : false
       

    }
    orderHandler = (event) =>{
        event.preventDefault();
        
        this.setState({loading: true});
        const formData={};
        for(let formElementIdentifier  in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        const orders ={
            ingredients :this.props.ingredients,
            totalPrice :this.props.price,
            orderData : formData    
            
        }

        axios.post ('/orders.json' , orders)
        .then(response => {
            this.setState({loading: false });
          console.log(response);
          this.props.history.push('/');
        } )
        .catch(error => {
            console.log(error);
            this.setState({loading: false });
        });

    }
    checkValidity (value, rules) {
        let isValid= true;

        if(rules.required){
            isValid =value.trim() !== '' && isValid ;
        }
        if(rules.minLength){
            isValid =value.length >= rules.minLength && isValid ;
        }
        if(rules.maxLength){
            isValid =value.length <= rules.maxLength && isValid ;
        }
        return isValid;
    }
    inputChangedHandler =(event, inputIdentifier) =>{
        
        const updatedOrderForm ={
            ...this.state.orderForm
        };
        const updatedFormelement ={
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormelement.value= event.target.value;
        updatedFormelement.valid=this.checkValidity(updatedFormelement.value, updatedFormelement.validation)
        updatedFormelement.touched= true;
        updatedOrderForm[inputIdentifier] = updatedFormelement;
        
        let formIsValid = true;
        for (let elementIdentifier in updatedOrderForm){

            formIsValid = updatedOrderForm[elementIdentifier].valid && formIsValid;
        }
        console.log(formIsValid)
        this.setState({orderForm: updatedOrderForm , formIsValid : formIsValid});
    }
    render () {
        const formElementArray =[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id: key,
                config : this.state.orderForm[key]
            })

        }
       
        let form = <form onSubmit ={this.orderHandler}>

            {formElementArray.map(formElement => (
                <Input key={formElement.id}
                elementType ={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid ={!formElement.config.valid}
                shouldValidate ={formElement.config.validation}
                touched ={formElement.config.touched}
                 changed={(event) => this.inputChangedHandler(event, formElement.id)} >
                
                </Input>
            )


            )}
       
        <Button btnType= "Success" disabled ={!this.state.formIsValid}>ORDER</Button>
    </form>

    if(this.state.loading===true){
        form=<Spinner/>
    }
        return  (

            <div className={Classes.ContactData}>  
            <h4>Enter your contact details</h4>
                {form}
            </div>
        )


    }
}

export default ContactData;