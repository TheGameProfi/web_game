import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Alert} from '@mui/material'


export default function Cockie(){

	const [cockie, setCockie] = useState(0);
	const [autoclicker, setAutoclicker] = useState(0);
	const [counter, setCounter] = useState(1);
	const [counter_price, setCounter_price] = useState(counter * 12);
	var first = true;
	var price = 12;
	var testo = 0;
	
	function cockies(){
		setCockie(cockie + 1);
	}
	function autoclickerone(){
		buy("one");
	}
	function autoclick(){
		setCockie(cockie + 2)
	}
	function setPrice(){
		var cache = Math.floor(autoclicker/5);
		if (cache >= 1) {price += 4;};
	}
	function buy(by){
		if(by ==="one"){
			if(cockie >= price){
				setCockie(cockie - price);
				setAutoclicker(autoclicker + 1);
				setPrice();
			}else return;
		}	
	}
	function openNav() {
  document.getElementById("mySidenav").style.right = "0px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.right = "-250px";
}

	return(
	<>
	<div id="mySidenav" class="sidenav">
	<a href="javascript:void(0)" class="closebtn" onClick={closeNav}>&times;</a>
	<div class="cockiecount">
	<input class="cockie" type="text" disabled value={'Du hast ' + cockie + ' Cockies'}/>
	</div>
	<br/>
	<br/>
	<input class="text" type="text" disabled value={'Du hast ' + autoclicker + ' Autocliker'}/>
		<button onClick={autoclickerone}>Kaufe 1 Autoclicker für {price} Cockies</button>
</div>
<p class="opennav" onClick={openNav}>&equiv;</p>
<div class="cockies">

		<input type="text" id="text" disabled value={cockie}/>
		<br/>
		<button onClick={cockies}>ClickMe</button>
		<br/>
		</div>
	</>
	)
}