const box = document.querySelector('.box');
const spinwrap= document.querySelector('.spinWrap')
const rollBtn = document.getElementById('rollBtn');
const betBtn = document.getElementById('betting');
const menu = document.querySelector('#numberPicked');
const numberShow = document.querySelector('.showNumber');
const betInput = document.getElementById('inputValue');
const showBalance = document.querySelector('.currentBalance')
const showBalance2 = document.querySelector('.currentBalance2')
const addBalance = document.querySelector('#depositBtn')
const valueDeposit = document.querySelector('#inputDeposit')
alertSucess= document.querySelector('#alertSucess')
alertError= document.querySelector('#alertError')


//conts buttons
blackJ= document.querySelector('#bjBtn');



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

betBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const raw = betInput.value.trim();
  const amount = Number(raw || 0);
  if (!amount || amount <= 0) return showToast('Introduz um valor de aposta válido.','danger');
  if (amount > balance && amount <= 100) return  showToast('Saldo insuficiente.', 'danger');   
  if (amount> 100) return showToast("Valor de aposta superior ao permitido", 'danger');  

  balance -= amount ; 
  currentBet = amount;
  betBtn.disabled = true;
  betInput.disabled = true;

  betInput.style.color= "green";

 
  enableDropdown(true);
  renderBalance();
  
  showToast(`you have bet ${amount} stones.`,'success'); 
  
});

addBalance.addEventListener('click',(e) =>{
  e.preventDefault();
    let value =Number(valueDeposit.value)
  Deposit(value)
  
})

menu.addEventListener('click', (e) => {
  const btn = e.target.closest('.dropdown-item');
  if (!btn) return;
  if (!currentBet) return showToast('Faz a aposta primeiro.','danger'); 
  guess = Number(btn.textContent.trim());
  numberShow.textContent = guess;
  rollBtn.disabled = false;
});

function rollDie() {


 

  if (!currentBet) return  showToast('you have to bet first', 'danger');
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


//funtions buttons 
function changegame(btn){

  const cardTitle = btn.closest('.card').querySelector('.card-title').textContent;
  let pageTitle= document.querySelector('#titlePage')
  pageTitle.textContent=cardTitle
  
  console.log(cardTitle);
}




renderBalance();
rollBtn.addEventListener('click', rollDie);

resetRound();