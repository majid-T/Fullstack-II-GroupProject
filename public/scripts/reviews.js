$( document ).ready(function (){
    var serachBtn = $("#searchBtn");
    var reviewUnOrderList = $("#allReviews");
    var serachTxt = $("#searchQTxt");
    var reviewList = [];
    var keywords =[];
    var popKeysDiv = $("#popKeys");

     $.get("./api/getKeywords").done(function (data){
        if(data){
            for (item of data){
                keywords.push(item);
                var label = document.createElement('label');
                label.innerText = item.word;
                label.classList.add('keywordLabel');
                label.addEventListener('click',(e)=>{
                    searchReviewsByParam(e.target.innerText);
                    });
                popKeysDiv.append(label);
            }
        }else{
            console.log('No keywords!');
        }
        console.log(keywords);
     });

     $.get("./api/getReviews").done(function(data){

                if(data){
                    for(item of data){

                        reviewUnOrderList.append(`<li class="revClass" id=${item._id}>${item.author}:${item.datePosted}<br><hr>&nbsp;&nbsp; &quot;${item.review}&quot;</li><br>`);
                        reviewList.push({review: item.review, id:item._id});
                    }
                }else{
                    console.log('No data!');
                }
            });

    function searchReviews(){

        var searchQuery = serachTxt.val().toLowerCase();
        for(item of reviewList){
            var modifiedRev = item.review.toLowerCase();
            if (modifiedRev.includes(searchQuery)){
                $(`#${item.id}`).show();
            }else{
                $(`#${item.id}`).hide();
            }
        }
    }

     function searchReviewsByParam(searchKey){
            for(item of reviewList){
                var modifiedRev = item.review.toLowerCase();
                if (modifiedRev.includes(searchKey.toLowerCase())){
                    $(`#${item.id}`).show();
                }else{
                    $(`#${item.id}`).hide();
                }
            }
        }
    serachBtn.on('click',searchReviews);
    // popKeysDiv.on('click',click);

});


