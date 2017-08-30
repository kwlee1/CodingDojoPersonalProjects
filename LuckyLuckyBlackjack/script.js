var cardvals = ["A",2,3,4,5,6,7,8,9,10,"J","Q","K"]; 
var table = []; 
var suit777 = []; 
var suit678 = []; 
var nosuit777 = []; 
var nosuit678 = [];
var suit21 = [];
var total21 = [];
var total20 = []; 
var total19 = []; 
var face = ["J","Q","K"]
var hands = 0; 

function createDeck(num){
    var deck = []; 
    for(var i = 1; i <= num; i++){
        for(var k = 0; k < cardvals.length; k++){
            deck.push([cardvals[k],1]);
            deck.push([cardvals[k],2]);
            deck.push([cardvals[k],3]);
            deck.push([cardvals[k],4]);
        }
    }
    return deck; 
}

function shuffleDeck(num){
    var deck = createDeck(num); 
    for(var d = 0; d < deck.length; d++){
        temp = deck[d]; 
        swap = Math.floor(Math.random()*deck.length);
        deck[d] = deck[swap];
        deck[swap] = temp;  
    }
    return deck; 
}

function createTable(num){
    for(var p = 1; p <= num; p++){
        table.push("Player " + p); 
    }
    table.push("Dealer");
    for(var b = 0; b < num; b++){
        suit777.push(0);
        suit678.push(0);
        nosuit777.push(0);
        nosuit678.push(0);
        suit21.push(0);
        total21.push(0);
        total20.push(0);
        total19.push(0);
    }
    
    return table; 
}

function noFaceCards(card1,card2){
    for(var i = 0; i < card1.length - 1; i++){
        if(card1[i][0] == "J" || card1[i][0] == "Q" || card1[i][0] == "K"){
            card1[i][0] = 10; 
        }
        if(card2[i][0] == "J" || card2[i][0] == "Q" || card2[i][0] == "K"){
            card2[i][0] = 10; 
        }
    }
}

function lucky(card1,card2){
    noFaceCards(card1,card2); 
    for(var i = 0; i < card1.length - 1; i++){
        if(card1[i][0] == 7 && card2[i][0] == 7 && card1[card1.length - 1][0] == 7){
            if(card1[i][1] == card2[i][1] && card1[i][1] == card1[card1.length - 1][1]){
                suit777[i]++;
            }
            else{
                nosuit777[i]++; 
            }
        }
        else if(card1[i][0] == 6 || card1[i][0] == 7 || card1[i][0] == 8){
            if(card2[i][0] == 6 || card2[i][0] == 7 || card2[i][0] == 8){
                if(card1[card1.length-1][0] == 6 || card1[card1.length-1][0] == 7 || card1[card1.length-1][0] == 8){
                    if(card1[i][0] != card2[i][0] && card1[i][0] != card1[card1.length-1][0] && card2[i][0] != card1[card1.length-1][0]){
                        if(card1[i][1] == card2[i][1] && card2[i][1] == card1[card1.length-1][1]){
                            suit678[i]++;
                        }
                        else{
                            nosuit678[i]++; 
                        }
                    }
                }
            }
        }
        else if(card1[i][0] == "A" || card2[i][0] == "A" || card1[card1.length-1][0] == "A"){
            if(card1[i][0] == "A"){
                card1[i][0] == 1;
            }
            if(card2[i][0] == "A"){
                card2[i][0] == 1;
            }
            if(card1[card1.length-1][0] == "A"){
                card1[card1.length-1][0] == 1;
            }
            if(card1[i][0] + card2[i][0] + card1[card1.length-1][0] == 21 || card1[i][0] + card2[i][0] + card1[card1.length-1][0] + 10 == 21){
                if(card1[i][1] == card2[i][1] && card2[i][1] == card1[card1.length-1][1]){
                    suit21[i]++; 
                }
                else{
                    total21[i]++; 
                }
            }
        }
        else if(card1[i][0] + card2[i][0] + card1[card1.length-1][0] == 21){
            if(card1[i][1] == card2[i][1] && card2[i][1] == card1[card1.length-1][1]){
                suit21[i]++;
            }
            else{
                total21[i]++;
            }
        }
        else if(card1[i][0] + card2[i][0] + card1[card1.length-1][0] == 20){
            total20[i]++;
        }
        else if(card1[i][0] + card2[i][0] + card1[card1.length-1][0] == 19){
            total19[i]++; 
        }
    }
}

function luckyLucky(numDeck,numPlayer,numRound){
    createTable(numPlayer); 
    for(var i = 0; i < numRound; i++){
        var deck = shuffleDeck(numDeck);
        while(deck.length > table.length * 2){
            var card1 = []; 
            var card2 = []; 
            hands++; 
            for(var k = 0; k < table.length; k++){
                card1.push(deck.pop());
            }
            for(var m = 0; m < table.length; m++){
                card2.push(deck.pop());
            }
            lucky(card1,card2); 
        } 
    }
    console.log("suit777: " + suit777);
    console.log("suit678: " + suit678); 
    console.log("nosuit777: " + nosuit777);
    console.log("nosuit678: " + nosuit678); 
    console.log("suit21: " + suit21);
    console.log("total21: " + total21);
    console.log("total20: " + total20);
    console.log("total19: " + total19); 
}

$("form").submit(function(){
    var numDeck = ($("#deck").val()); 
    var numPlayer = ($("#ppl").val()); 
    var numRound = ($("#round").val()); 
    luckyLucky(numDeck,numPlayer,numRound); 
    var myAppend = "<tr><th>Hands: " + hands + "</th>";
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<th>" + table[i] + "</th><th>%</th>";
    } 
    myAppend += "</tr><tr><td>7-7-7 Suited</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + suit777[i] + "</td><td>" + (suit777[i] / hands * 100) + "%</td>"; 
    }
    myAppend += "</tr><tr><td>6-7-8 Suited</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + suit678[i] + "</td><td>" + (suit678[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr><tr><td>7-7-7</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + nosuit777[i] + "</td><td>" + (nosuit777[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr><tr><td>6-7-8</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + nosuit678[i] + "</td><td>" + (nosuit678[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr><tr><td>21 Suited</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + suit21[i] + "</td><td>" + (suit21[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr><tr><td>21</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + total21[i] + "</td><td>" + (total21[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr><tr><td>20</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + total20[i] + "</td><td>" + (total20[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr><tr><td>19</td>"; 
    for(var i = 0; i < table.length-1; i++){
        myAppend = myAppend + "<td>" + total19[i] + "</td><td>" + (total19[i] / hands * 100) + "%</td>";
    }
    myAppend += "</tr>"; 

    $("#head").append(myAppend); 
    return false; 
})