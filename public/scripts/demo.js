$( document ).ready(function (){
    var manTable = $('#manTable');
    var govTable = $('#govTable');
    var vendTable = $('#vendTable');
    var custTable = $('#custTable');
    var distTable = $('#distTable');
    var dispTable = $('#dispTable');

    $.get('./api/getAllGuns',guns=>{
        populateTables(guns);
    });

    function makeButton(gun,_gunStatus,innerText){
        var button = document.createElement('button');
        button.id = gun.regNo;
        button.name = `${gun.regNo}`;
        button.value = `${gun.regNo}`;
        button.addEventListener('click',(e)=>{
            _gunStatus++;
            $.get(`./api/editGun?regNo=${e.target.value}&mode=${_gunStatus}`, function(data, status){
                console.log(`done! with reg=${e.target.value} mode=${_gunStatus}`);
                location.reload();
            });
        });
        button.innerText = innerText;

        return button;
    }

    function populateTables(gunsList){
        let statusList = [
            'Waiting Commit Registery', 'In Manufacturer Stock','Waiting Commit sale to Distributer',
            'In Distributer Stock','Waiting Commit sale to Vendor','In Vendor Shop','Waiting Commit sale to Customer',
            'In Customer hand','Returned for Disposal','Send for Disposal','Disposed'
        ];

        for(gun of gunsList){
            let gunStatus = gun.status ;
            //populate government table
            govTable.append("<tr>");
            govTable.append(`<td class="gunTd">${gun.manufact}</td>`);
            govTable.append(`<td class="gunTd">${gun.regNo}</td>`);
            govTable.append(`<td class="gunTd">${gun.specA}</td>`);
            govTable.append(`<td class="gunTd">${gun.specB}</td>`);
            govTable.append(`<td class="gunTd">${gun.built}</td>`);
            if(gunStatus % 2 === 0 ){
                if(gunStatus === 8 ){
                     govTable.append(makeButton(gun,gunStatus,'Send for disposal'));
                }else if(gunStatus===10) {
                      govTable.append(`<td class="stage${gunStatus}">${statusList[gunStatus]}</td>`);
                }else{
                    govTable.append(makeButton(gun,gunStatus,'Commit'));
                }
            }
            else{
                govTable.append(`<td class="stage${gunStatus}">${statusList[gunStatus]}</td>`);
            }
            // govTable.append("</tr>");

            //populate manufacturer table
            if(gunStatus === 1){
                manTable.append('<tr>');
                manTable.append(`<td class="gunTd">${gun.manufact}</td>`);
                manTable.append(`<td class="gunTd">${gun.regNo}</td>`);
                manTable.append(`<td class="gunTd">${gun.specA}</td>`);
                manTable.append(`<td class="gunTd">${gun.specB}</td>`);
                manTable.append(`<td class="gunTd">${gun.built}</td>`);
                manTable.append(makeButton(gun,gunStatus,'B2B Sell'));
                manTable.append('</tr>');
            }

            //populate distributer table
            if(gun.status===3){
                distTable.append('<tr>');
                distTable.append(`<td class="gunTd">${gun.manufact}</td>`);
                distTable.append(`<td class="gunTd">${gun.regNo}</td>`);
                distTable.append(`<td class="gunTd">${gun.specA}</td>`);
                distTable.append(`<td class="gunTd">${gun.specB}</td>`);
                distTable.append(`<td class="gunTd">${gun.built}</td>`);
                distTable.append(makeButton(gun,gunStatus,'B2B Sell'));
                distTable.append('</tr>');
            }

            //populate vendor table
            if(gun.status===5){
                vendTable.append('<tr>');
                vendTable.append(`<td class="gunTd">${gun.manufact}</td>`);
                vendTable.append(`<td class="gunTd">${gun.regNo}</td>`);
                vendTable.append(`<td class="gunTd">${gun.specA}</td>`);
                vendTable.append(`<td class="gunTd">${gun.specB}</td>`);
                vendTable.append(`<td class="gunTd">${gun.built}</td>`);
                vendTable.append(makeButton(gun,gunStatus,'Customer Sell'));
                vendTable.append('</tr>');
            }

            //populate customer table
            if(gun.status===7){
                custTable.append('<tr>');
                custTable.append(`<td class="gunTd">${gun.manufact}</td>`);
                custTable.append(`<td class="gunTd">${gun.regNo}</td>`);
                custTable.append(`<td class="gunTd">${gun.specA}</td>`);
                custTable.append(`<td class="gunTd">${gun.specB}</td>`);
                custTable.append(`<td class="gunTd">${gun.built}</td>`);
                custTable.append(makeButton(gun,gunStatus,'Return for disposal'));
                custTable.append('</tr>');
            }

            //populate disposal table
            if(gun.status===9){
                dispTable.append('<tr>');
                dispTable.append(`<td class="gunTd">${gun.manufact}</td>`);
                dispTable.append(`<td class="gunTd">${gun.regNo}</td>`);
                dispTable.append(`<td class="gunTd">${gun.specA}</td>`);
                dispTable.append(`<td class="gunTd">${gun.specB}</td>`);
                dispTable.append(`<td class="gunTd">${gun.built}</td>`);
                dispTable.append(makeButton(gun,gunStatus,'dispose'));
                dispTable.append('</tr>');
            }
        }
    };
});
