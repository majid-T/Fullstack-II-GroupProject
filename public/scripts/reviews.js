$( document ).ready(function (){
    var serachBtn = $("#searchBtn");
    var reviewUnOrderList = $("#allReviews");
    var serachTxt = $("#searchQTxt");
    var reviewList = [];
    var keywords =[];
    var popKeysDiv = $("#popKeys");
    var userSearches = [];

     $.get("./api/getKeywords").done(function (data){
        if(data){
            for (item of data){
                keywords.push(item);
            }
            for(i=0;i<keywords.length;i++){
                var label = document.createElement('label');
                label.innerText = keywords[i].word;
                label.classList.add('keywordLabel');
                label.addEventListener('click',(e)=>{
                    searchReviewsByParam(e.target.innerText);
                    });
                popKeysDiv.append(label);
            }
        }else{
            console.log('No keywords!');
        }
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
        if(!userSearches.includes(searchQuery)){
            userSearches.push(searchQuery);
            var keyCount =0;
            for (item of keywords){
                if(item.word == searchQuery){
                    keyCount = parseInt(item.count)+1;
                }
            }
            $.get(`./api/addKeyword?keyWord=${searchQuery}&keywordCount=${keyCount}`);
        }

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
        var searchQuery = searchKey.toLowerCase();

        if(!userSearches.includes(searchQuery)){
            userSearches.push(searchQuery);
            var keyCount =0;
            for (item of keywords){
                if(item.word == searchQuery){
                    keyCount = parseInt(item.count)+1;
                }
            }
            $.get(`./api/addKeyword?keyWord=${searchQuery}&keywordCount=${keyCount}`);
        }

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


