// makeInterface.js

function makeInterface()
{
    let context = null;

    let mainDiv = ce('div');
    mainDiv.id = 'mainDiv';
    mainDiv.className = 'mainDiv';
    ba(mainDiv);

    //-//

    let chatBox = ce('div');
    chatBox.id = 'chatBox';
    chatBox.innerHTML = '';
    chatBox.className = 'chatBox';
    mainDiv.append(chatBox);

    //-//

    let lineBreakUnderOutput = ce('hr');
    mainDiv.append(lineBreakUnderOutput);

    //-//

    let userInput = ce('input');
    userInput.id = 'userInput';
    userInput.className = 'userInput';
    userInput.style.type = 'text';
    userInput.style.placeholder = 'Type Words Here';
    mainDiv.append(userInput);

    //-//

    let sendButton = ce('button');
    sendButton.innerHTML = 'Send';
    sendButton.id = 'sendButton';
    sendButton.className = 'sendButton';
    mainDiv.append(sendButton);

    //-//

    // Enter button activates a click on send button
    userInput.onkeydown = function(event)
    {
        if (event.key === 'Enter')
        {
            // prevent default Enter key behavior
            event.preventDefault();

            // trigger a click on the send button 
            sendButton.click();

            // color send button border aqua
            ge('sendButton').style.borderColor = 'rgb(0, 255, 255)';

            // color send button font color aqua
            ge('sendButton').style.color = 'rgb(0, 255, 255)';

            // after 275 milliseconds
            setTimeout(function()
            {
                // default border color of send button
                ge('sendButton').style.borderColor = 'rgb(255, 255, 255)';

                // default font color of send button
                ge('sendButton').style.color = 'rgb(255, 255, 255)';
            }, 275);
        }
    };

    sendButton.onclick = function()
    {
        clickSound();

        // display what the person typed in chatBox
        ge('chatBox').innerHTML += `<span style = 'color: rgb(255, 255, 255);'>${ge('userInput').value}</span><br>`;

        let userQuestion = userInput.value.trim();

        if (userQuestion)
        {
            let responseObj = responses.find(function(obj)
            {
                return obj.keywords.some(function(keyword)
                {
                    // lowercase and remove punctuation
                    let cleanInput = userQuestion.toLowerCase().replace(/[^\w\s]/g, '');

                    let cleanKeyword = keyword.toLowerCase();
                    
                    // check for exact match of cleaned input and cleaned keyword
                    return cleanInput === cleanKeyword;
                });
            });

            if (responseObj)
            {
                let randomIndex = Math.floor(Math.random() * responseObj.responses.length);

                ge('chatBox').innerHTML += `<span style = 'color: aqua;'>${responseObj.responses[randomIndex]}</span><br>`;

                if (responseObj.keywords.indexOf('bye') !== -1)
                {
                    context = null;

                    ge('chatBox').scrollTop = ge('chatBox').scrollHeight;
                }
                else
                {
                    context = responseObj.keywords;

                    ge('chatBox').scrollTop = ge('chatBox').scrollHeight;
                }
            }
            else
            {
                let result = calculate(userQuestion);

                if (result !== null)
                {
                    ge('chatBox').innerHTML += `<span style = 'color: aqua;'>${result}</span><br>`;

                    ge('chatBox').scrollTop = ge('chatBox').scrollHeight;
                }
                else
                {
                    let randomIndex = Math.floor(Math.random() * randomResponses.length);

                    ge('chatBox').innerHTML += `<span style = 'color: aqua;'>${randomResponses[randomIndex]}</span><br>`;

                    ge('chatBox').scrollTop = ge('chatBox').scrollHeight;
                }
            }

            userInput.value = '';
        }
    };
}

//----//

// Dedicated to God the Father
// All Rights Reserved Christopher Andrew Topalian Copyright 2000-2025
// https://github.com/ChristopherTopalian
// https://github.com/ChristopherAndrewTopalian
// https://sites.google.com/view/CollegeOfScripting

