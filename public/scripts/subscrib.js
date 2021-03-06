$( document ).ready(function (){
    var checkSubButton = $('#checkSubButton');
    var emailToCheck = $("#emailToCheck");
    var emailToAdd = $("#emailToAdd");
    var registeredEmails =[] ;
    var editEmailDiv = $('#editEmailDiv');

    //get all emails of newsletter
    $.get("./api/getEmail").done(function(data){
            if(data){
                for(item of data){
                    registeredEmails.push(item.email);
                }
            }else{
                console.log('No data!');
            }

            console.log(registeredEmails);
        });

    function getEmail(userEmail){
        $.get(`./api/getEmail?userEmail=${$("#emailToCheck").val()}`).done(function(data){

            editEmailDiv.empty();
            if(data){

                console.log(data);
                editEmailDiv.append(`<p>${data.email}</p>`);
                if(data.events==true || data.events=='true' ){
                    editEmailDiv.append(`<input id="eventsCheck" type="checkbox" name="events" value="events" checked/>Events`);
                }else{
                    editEmailDiv.append(`<input id="eventsCheck" type="checkbox" name="events" value="events" />Events`);
                }

                if(data.news==true || data.news=='true'){
                    editEmailDiv.append(`<input id="newsCheck" type="checkbox" name="events" value="events" checked/>News`);
                }else{
                    editEmailDiv.append(`<input id="newsCheck" type="checkbox" name="events" value="events"/>News`);
                }

                if(data.other==true || data.other=='true' ){
                    editEmailDiv.append(`<input id="otherCheck" type="checkbox" name="events" value="events" checked/>Other`);
                }else{
                    editEmailDiv.append(`<input id="otherCheck" type="checkbox" name="events" value="events" />Other`);
                }

                if(data.active==true || data.active=='true'){
                    editEmailDiv.append(`<input id="activeCheck" type="checkbox" name="events" value="events" checked/>Active`);
                }else{
                    editEmailDiv.append(`<input id="activeCheck" type="checkbox" name="events" value="events" />Active`);
                }

                var button = document.createElement('button');
                button.id = data.email;
                button.name = `${data.email}`;
                button.value = `${data.email}`;

                button.addEventListener('click',(e)=>{
                    otherChecked = $("#otherCheck").is(":checked");
                    eventsChecked = $("#eventsCheck").is(":checked");
                    newsChecked = $("#newsCheck").is(":checked");
                    activeChecked =$("#activeCheck").is(":checked");
                    $.get(`./api/editEmail?email=${e.target.value}&other=${otherChecked}&news=${newsChecked}&events=${eventsChecked}&active=${activeChecked}`,
                     function(data, status){
                    });
                    alert('Changes will submit. Thank you!');
                    editEmailDiv.empty();
                });
                button.innerText = 'edit';
                editEmailDiv.append(button);
            }else{
                console.log('No data!');
            }
        });
    }


    function toggleAddButton(flag){
        if(flag){
            $("#err_newsLetter").css("background-color", "red").text("already subscribed");
            $("#addEmailBtn").attr("disabled", true);;
        }else{
            $("#err_newsLetter").css("background-color", "white").text("");
            $("#addEmailBtn").attr("disabled", false);;
        }

    }

    emailToAdd.focusout(function(){
        for(item of registeredEmails){
            if(emailToAdd.val()===item){
                toggleAddButton(true);
                break;
            }else{
                toggleAddButton();
            }
        }
    });

    checkSubButton.on('click',getEmail);
});
