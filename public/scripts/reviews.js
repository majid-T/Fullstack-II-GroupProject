$( document ).ready(function (){
    var serachBtn = $("#searchBtn");
    var reviewOnOrderList = $("#allReviews");
    var serachTxt = $("#searchQTxt");
    var reviewList = [];
    var keywords =[];
    var popKeysDiv = $("#popKeys");

     $.get("./api/getKeywords").done(function (data){
        if(data){
            for (item of data){
                keywords.push(item);
                popKeysDiv.append(`<label class="keywordLabel">${item.word}</label>`);
            }
        }else{
            console.log('No keywords!');
        }
        console.log(keywords);
     });

     $.get("./api/getReviews").done(function(data){

                if(data){
                    for(item of data){

                        reviewOnOrderList.append(`<li id=${item._id}>${item.author}:${item.review} - ${item.datePosted}</li>`);
                        reviewList.push({review: item.review, id:item._id});
                    }
                }else{
                    console.log('No data!');
                }
                console.log(reviewList);
            });

    function getReviewsForSearch(searchQ){
        serachQuery = serachTxt.val();
        for(item of reviewList){
            if (item.review.includes(serachQuery)){
                $(`#${item.id}`).show();
            }else{
                $(`#${item.id}`).hide();
            }
        }

        //Get all reviews
        // var i,searchMatch,txtValue;
        // for(i=0;i<reviewList.length;i++){
        //     searchMatch=reviewList[i];
        //     txtValue=searchMatch.textArea || searchMatch.innerText;
        //     if(txtValue>-1){
        //         searchMatch[i].style.display="";
        //     }else{
        //       searchMatch[i].style.display="none";
        //     }
        // }

    }

    function click(){
        alert('clicked!');
    }
    serachBtn.on('click',getReviewsForSearch);
    popKeysDiv.on('click',click);

});


