import React,{Component} from 'react';
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import {Card} from 'react-bootstrap'
import './App.css'

class App extends Component {

  state = {
    data: [],
    question: "",
    qtype: "",
    Tscore: 0,
    anssty: undefined,
    display: undefined,
    checked: false
  }
    

   totalScore = 0
   visted = []
   ansStyle = undefined
   
  
  componentDidMount(){
    axios.get(`https://opentdb.com/api.php?amount=10`)
    .then( res => {
      //console.log(res.data.results)
      this.setState({data: res.data.results})
      //console.log(res.data.results.question)
      console.log(this.state.data)
    })
  }

  shuffle = (arr) => {
    var i,
        j,
        temp;
    const a = []
    if(arr.length !== 0 ){
    for(let i =0; i<arr.length; i++){
          a.push(arr[i])
        }
    }
    //console.log(arr)
    for (i = 1 ; i < arr.length; i++) {
        
        j = Math.floor(Math.random() * (i+1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    return arr;    
};



checkAnswer = (ans1,ans2,index) => {
  const divStyle = {
    background: 'green',
    };
    const divStyle1 = {
      background: 'red',
      };
    
    
    
    if(this.visted[index] === 0){
      this.visted[index] = 1
    

    if(ans1 === ans2){
      this.totalScore = this.totalScore+1
      this.setState({anssty: divStyle})
      this.setState({checked: true})
      console.log(this.totalScore)
    }
    else this.setState({anssty: divStyle1})}

    
}

submit = () => {

  const display = <div style={{marginTop: "10px", marginBottom: "10px"}}>
<Card>
  <Card.Body>Your score {this.totalScore}.</Card.Body>
</Card>
  </div>

  this.setState({display: display})
}

  render(){
    
    let ans = []
    let questions

    for( let j = 0; j<10; j++){
      this.visted.push(0)
    }

    
    //console.log(this.state.data.length === 0)
    if(this.state.data.length === 0){
        questions = <div>
          <Spinner animation="grow" variant="info" />
          </div>
        console.log("loading")
    }
    
    questions = this.state.data.map((key,index) => {
      //qtype = ""
      return (
        Object.keys(key).map(res => {
          
          if(res === "question")
        return (<div key = {index} className="card">
        <div className="card-body" style={{marginBottom: "8px", marginTop: "8px", backgroundcolor: "EC836C"}} >
            <p>Q{index+1}. {key[res]}</p>
        </div>
            </div>)

          ans = []

          if(res === "correct_answer"){

            if(key[res] === "True" || key[res] === "False"){
              //qtype = "boolean"
              if(key[res] === "True")
              ans.push("True")
              if(key[res] === "False")
              ans.push("False")
              
            }
            else{
            ans.push(key[res])
            }
          }

          if(res === "incorrect_answers"){
              key[res].map(a => {
               ans.push(a)    
                     
             })}
             //ans = this.shuffle(ans)
             
             return (ans.map((a,i) => {
               
               if(a !== undefined ){
                //if(this.state.checked === true || a === key["correct_answer"] )

               return (
                
                <div className="card" style= {{width: "18rem", marginTop: "4px", marginBottom : "4px"}}
                key ={i}
                onClick={() => this.checkAnswer(key["correct_answer"],a,index)}
                //style={{color: (key["correct_answer"]===a) ? 'green' : 'red'}}
                >
                <ul className="list-group list-group-flush" >
                  <li className="list-group-item" style = {this.anssty}> {a}</li>
                </ul>
              </div>
                      
            ) 
            
        }
      }))
       
        })
      )
    })


  return (
    <div  >
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{width: "100%"}}>
    <a className="navbar-brand" href="#">Trivia Quiz</a>
      </nav>
      
      {questions}
      <button type="button" className="btn btn-primary btn-lg btn-block" onClick = {this.submit}>Submit</button>
      {this.state.display}
    </div>
  );
}
}
export default App;
