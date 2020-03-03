//Factory to market functions

// ----- gun registeration functions
function reqReg(){
    document.getElementById('reqIcon1').classList.replace('position1','position2');
    document.getElementById('statusA1').innerText="Requesting for gun registration.";
}

function reqApproved(){
    document.getElementById('reqIcon1').classList.replace('position2','position3');
    document.getElementById('reqIcon1').src="icons/gunReqRegOkByLogoMakr.com.png";
    document.getElementById('statusA1').innerText="Gun registerd and commit to blockchain.";
}

// ----- gun to distributers functions
function reqGunSold(){
    document.getElementById('reqIcon2').classList.replace('position1','position2');
    document.getElementById('statusA1').innerText="Guns are sold to disterbuters and status change request.";
}

function gunSoldApproved(){
    document.getElementById('reqIcon2').classList.replace('position2','position3');
    document.getElementById('reqIcon2').src="icons/gunsSoldApprovedByLogoMakr.com.png";
    document.getElementById('statusA1').innerText="Guns ownership status updated.";
}

// ----- distributers sell guns functions
function sellToShops(){
    document.getElementById('reqIcon3').classList.replace('position1','position2');
    document.getElementById('statusA1').innerText="Guns are sold by disterbuters to shops and status change request.";
}

function sellToShopsApproved(){
    document.getElementById('reqIcon3').classList.replace('position2','position3');
    document.getElementById('reqIcon3').src="icons/distGunsSoldByAppLogoMakr.com.png";
    document.getElementById('statusA1').innerText="Guns ownership status updated.";
}

//User gun permit request
function askForPermit(){
    document.getElementById('reqIcon4').classList.replace('position1','position2');
    document.getElementById('statusA2').innerText='User requests gun permit';
}

function permitApproved(){
    document.getElementById('reqIcon4').classList.replace('position2','position3');
    document.getElementById('reqIcon4').src='icons/userGunPermitAppByLogoMakr.com.png';
    document.getElementById('statusA2').innerText='Gun permit approved and commit blockchain';
}

//User purchase of gun
function buyAGun(){
    document.getElementById('reqIcon1').classList.replace('position1','position2');
    document.getElementById('statusA1').innerText='User purchase a gun from vendor';
}

function gunPurchaseApproved(){
    document.getElementById('reqIcon1').classList.replace('position2','position3');
    document.getElementById('reqIcon1').src='icons/gunsSoldApprovedByLogoMakr.com.png';
    document.getElementById('statusA1').innerText='Gun purchase approved and commit blockchain';
}

//C2C gun sale
function sellAGun(){
    document.getElementById('reqIcon2').classList.replace('position1','position2');
    document.getElementById('statusA1').innerText='User makes a C2C sale';
}

function c2cApproved(){
    document.getElementById('reqIcon2').classList.replace('position2','position3');
    document.getElementById('reqIcon2').src='icons/gunsSoldApprovedByLogoMakr.com.png';
    document.getElementById('statusA1').innerText='Gun transfer approved and commit blockchain';
}

//Return for disposal
function returnToGov(){
    document.getElementById('reqIcon3').classList.replace('position1','position2');
    document.getElementById('statusA1').innerText='User returns guns for disposal';
}

function disposalApproved(){
    document.getElementById('reqIcon3').classList.replace('position2','position3');
    document.getElementById('reqIcon3').src='icons/gunsSoldApprovedByLogoMakr.com.png';
    document.getElementById('statusA1').innerText='Gun return for disposal approved and commit blockchain';
}

//Sending for disposal
function govToFirm(){
    document.getElementById('reqIcon4').classList.replace('position1','position2');
    document.getElementById('statusA2').innerText='Guns are sent for disposal and changes are commited';
}

function disposeGuns(){
    document.getElementById('reqIcon4').classList.replace('position2','position3');
    document.getElementById('reqIcon4').src='icons/disposalByLogoMakr.com.png';
    document.getElementById('statusA2').innerText='Guns are disposed and changes are commit blockchain';
}


//General functions
function clearStatus(){
    document.getElementById('statusA1').innerText="";
    document.getElementById('statusA2').innerText="";
}

function resetA1(){
    document.getElementById('reqIcon1').classList.replace('position3','position1');
    document.getElementById('reqIcon1').src="icons/gunReqRegByLogoMakr.com.png";

    document.getElementById('reqIcon2').classList.replace('position3','position1');
    document.getElementById('reqIcon2').src="icons/gunsSoldByLogoMakr.com.png";

    document.getElementById('reqIcon3').classList.replace('position3','position1');
    document.getElementById('reqIcon3').src="icons/distGunsSoldByLogoMakr.com.png";

}

function resetA2(){
    document.getElementById('reqIcon4').classList.replace('position3','position1');
    document.getElementById('reqIcon4').src="icons/userGunPermitByLogoMakr.com.png";
}


//Function bundles
function regGun(){
    setTimeout(reqReg, 0000);
    setTimeout(reqApproved,4000);
    setTimeout(clearStatus,8200);
}

function gunsSold(){
    setTimeout(reqGunSold, 0000);
    setTimeout(gunSoldApproved,4000);
    setTimeout(clearStatus,8200);
}

function gunsSoldToShops(){
    setTimeout(sellToShops, 0000);
    setTimeout(sellToShopsApproved,4000);
    setTimeout(clearStatus,8200);
}

function gunPermitReq(){
    setTimeout(askForPermit, 0000);
    setTimeout(permitApproved,4000);
    setTimeout(clearStatus,8200);
}

function userVendorTx(){
    setTimeout(buyAGun, 0000);
    setTimeout(gunPurchaseApproved,4000);
    setTimeout(clearStatus,8200);
}

function c2cSale(){
    setTimeout(sellAGun, 0000);
    setTimeout(c2cApproved,4000);
    setTimeout(clearStatus,8200);
}

function return4Disposal(){
    setTimeout(returnToGov, 0000);
    setTimeout(disposalApproved,4000);
    setTimeout(clearStatus,8200);
}

function govDispose(){
    setTimeout(govToFirm, 0000);
    setTimeout(disposeGuns,4000);
    setTimeout(clearStatus,8200);
}
