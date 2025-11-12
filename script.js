const box = document.querySelector('.box');
const spinwrap= document.querySelector('.spinWrap')


// btn's betting
const betBtn = document.querySelector('.betting');
const betBtnRps= document.querySelector('#betrps')
const betBtnRollete= document.querySelector('#betrollete')

// dropdown list
const menu = document.querySelector('#numberPicked');
const menuRPS= document.querySelector('#movePicked')
const userNumberRollete=document.querySelector('#numberUserRollete') 

//botao para jogar
const rollBtn = document.getElementById('rollBtn');
const fightBtn= document.getElementById('fightBtn')

//number selected
const numberShow = document.querySelector('.showNumber');
const moveShow = document.querySelector('.showMove')

//bet input value 
const betInput = document.querySelector('.inputValue');
const betInputRPS= document.querySelector('#inputRps')
//*
const betInputRollete= document.querySelector('#inputrollete')
const betUserNumber= document.querySelector('#numberUserRollete')
const btnInputRollete=document.querySelector('#confirmNumberRollete')
//*

//acc balance navbar and modal
const showBalance = document.querySelector('.currentBalance')
const showBalance2 = document.querySelector('.currentBalance2')

//btn deposit and input
const addBalance = document.querySelector('#depositBtn')
const valueDeposit = document.querySelector('#inputDeposit')

//alert message
alertSucess= document.querySelector('#alertSucess')
alertError= document.querySelector('#alertError')

//image user rps
  const userDiv= document.querySelector('.userFigures')




let balance = 100;
let currentBet = 0;
let guess = null;
let lastN = null;


const MULTIPLIER = 5;
const faceAngles = {
  1: { x: 0,   y:   0 },
  2: { x: 0,   y: 180 },
  3: { x: 0,   y: -90 },
  4: { x: 0,   y:  90 },
  5: { x: -90, y:   0 },
  6: { x: 90,  y:   0 },
};

 




//*********************funcoes rollete**********************
//imagem wheel

//1 btn bet value rollete
betBtnRollete.addEventListener('click',(e)=>{
   e.preventDefault();


const raw = betInputRollete.value.trim();
  const amount = Number(raw || 0);
  if (!amount || amount <= 0) return showToast('Please enter a valid bet amount.','danger');
  if (amount > balance && amount <= 100) return  showToast('You dont have stones enough', 'danger');   
  if (amount> 100) return showToast("Bet amount exceeds the allowed limit", 'danger');  

  balance -= amount ; 
  currentBet = amount;

  betBtnRollete.disabled = true;

  betInputRollete.disabled = true;
  betInputRollete.style.color= "green";

  renderBalance();
  
  showToast(`you have bet ${amount} stones.`,'success'); 


})
//2 btn bet value rollete
btnInputRollete.addEventListener('click',(e)=>{
   e.preventDefault();

    const selected = document.querySelector('input[name="rouletteColor"]:checked');
    const value = Number(betUserNumber.value);
    const redNumbers= [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]
    const blackNumbers= [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
    const green = 0
     //computer move
    const computerMove= Number(Math.floor(Math.random() * 37));
    console.log(computerMove)
    const userNumber= value


  if(value<0 || value >36 || value.length>2){
           console.log("falhou o programa")
      return showToast('Please enter a valid number.','danger');
    }


  if(value && !selected){

    if (userNumber===computerMove){
        console.log("you win")
        let finalamount= currentBet*30
        balance+=finalamount
        
        
      }
      else{console.log("you lose")
        
        
        
        
      }
    
  }

  else if(!value && selected){    
    console.log("Cor escolhida:", selected.value);

    if(blackNumbers.includes(computerMove) && selected.value==="2" ){
      console.log("escolheste preto e saiu preto, ganhaste")
      let finalamount= currentBet*2
        balance+=finalamount
    }

    else if(redNumbers.includes(computerMove) && selected.value==="1" ){
      console.log("escolheste vermelho e saiu vermelho, ganhaste")
      let finalamount= currentBet*2
        balance+=finalamount
    }

    else if(green === computerMove && selected.value==="0" ){
      console.log("escolheste green e saiu green, ganhaste")
      let finalamount= currentBet*2
        balance+=finalamount
    }
     else{
      console.log("escolheste: " ,selected.value, "saiu :", computerMove)
      
      
    }
    }

    else if(value && selected){

      if (userNumber===computerMove){
        console.log("you win the number")
        let finalamount= currentBet*30
        balance+=finalamount
      }
      else{console.log("you lose the number")}

       if(blackNumbers.includes(computerMove) && selected.value==="2" ){
      console.log("escolheste preto e saiu preto, ganhaste")
      let finalamount= currentBet*2
        balance+=finalamount
    }

    else if(redNumbers.includes(computerMove) && selected.value==="1" ){
      console.log("escolheste vermelho e saiu vermelho, ganhaste")
      let finalamount= currentBet*2
        balance+=finalamount
    }

    else if(green === computerMove && selected.value==="0" ){
      console.log("escolheste green e saiu green, ganhaste")
      let finalamount= currentBet*2
        balance+=finalamount
    }
     else{
      console.log("perdeste a cor: escolheste: " ,selected.value, "saiu :", computerMove)
      
      
    }
    }

    

   


  
 


    document.querySelectorAll('input[name="rouletteColor"]').forEach(radio => {
    radio.checked = false;
    betUserNumber.value=''
    betBtnRollete.disabled = false;
    betInputRollete.disabled = false;
    betInputRollete.textContent = "";
    betInputRollete.style.color= "white";
     renderBalance();
  });



})
//********************* end funcoes rollete**********************


//*********************funcoes rps**********************
//1 btn bet value RPS
betBtnRps.addEventListener('click',(e)=>{
   e.preventDefault();


const raw = betInputRPS.value.trim();
  const amount = Number(raw || 0);
  if (!amount || amount <= 0) return showToast('Please enter a valid bet amount.','danger');
  if (amount > balance && amount <= 100) return  showToast('You dont have stones enough', 'danger');   
  if (amount> 100) return showToast("Bet amount exceeds the allowed limit", 'danger');  

  balance -= amount ; 
  currentBet = amount;

  betBtnRps.disabled = true;

  betInputRPS.disabled = true;
  betInputRPS.style.color= "green";

  renderBalance();
  
  showToast(`you have bet ${amount} stones.`,'success'); 


})
//2 ver o move que escolher rps
menuRPS.addEventListener('click', (e) => {

  

  const btn = e.target.closest('.dropdown-item');
  if (!btn) return;
  if (!currentBet) return showToast('Place your bet first','danger'); 
  guess = btn.textContent;
  console.log(guess)

  let guessvalue=0
  if(guess=="Rock"){
    guessvalue=1
    userDiv.textContent="✊"
    userDiv.style
  }
  if(guess=="Paper"){
    guessvalue=2
    userDiv.textContent="✋"
  }
  if(guess=="Scissors"){
    guessvalue=3
    userDiv.textContent="✌️"
  }
  moveShow.textContent = guess;
  fightBtn.disabled = false;
});
// 3 funcao fight rps
function fight() {

const pcDiv = document.querySelector('.computerFigures')


  if (!currentBet) return  showToast('Place your bet first', 'danger');
  if (guess == null) return showToast('Place a number first.', 'danger'); 

  const pcMovevalue = Math.floor(Math.random() * 3) + 1;
  let pcMove = null
  let payout = currentBet* 3 

   if(guess=="Rock"){
    
    userDiv.textContent="✊"
  }
  if(guess=="Paper"){
    userDiv.textContent="✋"
  }
  if(guess=="Scissors"){
    userDiv.textContent="✌️"
  }


 if(pcMovevalue===1){
    pcMove="Rock"
    pcDiv.textContent="✊"

  }
  if(pcMovevalue===2){
    pcMove="Paper"
    pcDiv.textContent="✋"
  }
  if(pcMovevalue===3){
    pcMove="Scissors"
    pcDiv.textContent="✌️"
  }



  setTimeout(() => {
  
if (guess=="Rock" && pcMove=="Rock"){
    showToast(`its a tie,'success'`)
}
if (guess=="Rock" && pcMove=="Paper"){
    showToast(`You lose.. ${currentBet} stones`, 'danger')
}
if (guess=="Rock" && pcMove=="Scissors"){
   showToast(`You won! ${payout} stones!`, 'success')
}
if (guess=="Paper" && pcMove=="Rock"){
   showToast(`You won! ${payout} stones!`, 'success')
}
if (guess=="Paper" && pcMove=="Paper"){
      showToast(`its a tie,'success'`)
}
if (guess=="Paper" && pcMove=="Scissors"){
   showToast(`You lose.. ${currentBet} stones`, 'danger')
}
if (guess=="Scissors" && pcMove=="Rock"){
   showToast(`You lose.. ${currentBet} stones`, 'danger')
}
if (guess=="Scissors" && pcMove=="Paper"){
   showToast(`You won! ${payout} stones!`, 'success')
}
if (guess=="Scissors" && pcMove=="Scissors"){
     showToast(`its a tie,'success'`)
}
    renderBalance();
    resetRound();
  }, 3000);

 console.log(`O computador escolheu ${pcMove}`)
  
}

//********************* end funcoes rps**********************




//*********************funcoes dado**********************
//1 btn bet value ROLL
betBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const raw = betInput.value.trim();
  const amount = Number(raw || 0);
  if (!amount || amount <= 0) return showToast('Please enter a valid bet amount.','danger');
  if (amount > balance && amount <= 100) return  showToast('You dont have stones enough', 'danger');   
  if (amount> 100) return showToast("Bet amount exceeds the allowed limit", 'danger');  

  balance -= amount ; 
  currentBet = amount;

  betBtn.disabled = true;

  betInput.disabled = true;
  betInput.style.color= "green";

 
  enableDropdown(true);
  renderBalance();
  
  showToast(`you have bet ${amount} stones.`,'success'); 
  
});
// 2 ver qual o numero que escolheu
menu.addEventListener('click', (e) => {
  const btn = e.target.closest('.dropdown-item');
  if (!btn) return;
  if (!currentBet) return showToast('Place your bet first','danger'); 
  guess = Number(btn.textContent.trim());
  numberShow.textContent = guess;
  rollBtn.disabled = false;
});
// 3 funcao rodar o dado
function rollDie() {

  if (!currentBet) return  showToast('Place your bet first', 'danger');
  if (guess == null) return showToast('Place a number first.', 'danger'); 

  const n = 1 + Math.floor(Math.random() * 6);
  lastN = n;

  const spinsX = 360 * (2 + Math.floor(Math.random() * 4));
  const spinsY = 360 * (2 + Math.floor(Math.random() * 4));
  const { x, y } = faceAngles[n];

  spinwrap.style.animation="none"
  box.style.transform = `rotateX(${x + spinsX}deg) rotateY(${y + spinsY}deg)`;


  rollBtn.disabled = true;

  setTimeout(() => {
    if (n === guess) {
      
      const payout = currentBet * (MULTIPLIER + 1);
      balance += payout;
      showToast(`number: ${n}. You won! ${payout} stones!`, 'success')
    } else {
      showToast(` number : ${n} ||  You lose.. ${currentBet} stones`, 'danger')
    }
    renderBalance();
    resetRound();
  }, 3000);

 
  
}
//********************* end funcoes rps**********************




//********************* Geral**********************
// escolhe card aposta
function changeGameplayDiv(idGameplay){

  const gameplays = document.querySelectorAll('.gameplay')
  

  // Esconde todas
  gameplays.forEach(div => {
    div.style.display = 'none'
  })

 
  const ativa = document.getElementById(idGameplay)
  ativa.style.display = 'block'

  //muda o titulo da pagina principal
  const setTitle = document.querySelector('#titlePage');
  
  if (idGameplay === 'diceGameplay') {
    setTitle.textContent = 'Roll the Dice 🎲';
  } else if (idGameplay === 'rpsGameplay') {
    setTitle.textContent = 'Rock Paper Scissors ✊📄✂️';
  } 
   else if (idGameplay === 'rolleteGameplay') {
    setTitle.textContent = 'The rollete wheel 🛞';
  }
  else {
    setTitle.textContent = 'GameMax';
  }
  
}
// escolhe imagem de jogo
function changeGameImage(idView){
  const gameplays = document.querySelectorAll('.scene')

    gameplays.forEach(div => {
    div.style.display = 'none'
  })

    const ativa = document.getElementById(idView)
    ativa.style.display = 'block'

}

//mensagens de erro ou success
function showToast(message, type = 'success') {
  const toastEl = document.getElementById('liveToast');
  const toastBody = document.getElementById('toast-body');

  // muda a cor conforme o tipo
  toastEl.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning');
  toastEl.classList.add(`text-bg-${type}`);

  toastBody.textContent = message;

  const toast = new bootstrap.Toast(toastEl, { delay: 2000 });
  toast.show();
}
//depositar stones
function Deposit(amount){
  if (amount>0){
 balance+= amount
 renderBalance();
 showToast(`You have added ${amount} stones to your account`, 'success')
  
  }
  else{
    showToast("something went wrong, please try again","danger")
  }

  valueDeposit.value=''
    
}
// depositar
addBalance.addEventListener('click',(e) =>{
  e.preventDefault();
    let value =Number(valueDeposit.value)
  Deposit(value)
  
})
//mostar saldo
function renderBalance(){
showBalance.textContent=`${balance} stones`
showBalance2.textContent=`${balance} stones`

}
// helpers de UI
function enableDropdown(enable) {
  menu.style.pointerEvents = enable ? 'auto' : 'none';
  menu.style.opacity = enable ? '1' : '.6';
  menu.setAttribute('aria-disabled', enable ? 'false' : 'true');
}
//after the pay we reset the round
function resetRound() {
  currentBet = 0;
  guess = null;
  lastN = null;
  betInput.value = '';
  betInput.disabled = false;
  betInput.style.color= "white";
  betBtn.disabled = false;
  enableDropdown(false);
  numberShow.textContent = '';
  rollBtn.disabled = true;
}
//********************* End Geral**********************




//****iniciacao de funcoes****
renderBalance();

rollBtn.addEventListener('click', rollDie);
fightBtn.addEventListener('click',fight)


resetRound();

