let taxSwitch = document.getElementById("switchCheckChecked");
taxSwitch.addEventListener( "click", ()=> {
let taxinfo = document.getElementsByClassName("tax_info");
for(info of taxinfo){
    if(info.style.display == "inline"){
        info.style.display = "none";
    }else{
        info.style.display = "inline";
    };
};
});