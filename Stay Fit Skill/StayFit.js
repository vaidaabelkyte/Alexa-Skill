var https = require('https');
var queryString = require('querystring');

// Lambda function:
exports.handler = function (event, context) {

    console.log('Running event');
    
};


// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);


        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                        context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        }  else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                         context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
            ", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
            ", sessionId=" + session.sessionId);

    // Dispatch the launch.
    getWelcomeResponse(callback);
   
  
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
            ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    
    if("WorkoutType" === intentName){
        var destination = intentRequest.intent.slots.Destination.value;
       
        if("booty" === destination){
            handleBootyRequest(intent, session, callback);
        } else if ("abs" === destination){
            handleAbsRequest(intent, session, callback);
        } else if ("cardio" === destination){
           handleCardioRequest(intent, session, callback);
        } else if ("yoga" === destination){
           handleYogaRequest(intent, session, callback);
          } 
        }
        else {
          throw "Invalid intent";
        }
    
}

function handleCardioRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Welcome to the cardio workout.  Running late is not enought.  You have to do ten jumping jacks in ten seconds. Ready? Three. Two. One. Go. <break time='0.5s'/> one  <break time='1s'/> two  <break time='1s'/> three  <break time='1s'/> four  <break time='1s'/> five  <break time='1s'/> six  <break time='1s'/> seven  <break time='1s'/> eight  <break time='1s'/> nine  <break time='1s'/><emphasis level='strong'/>  ten. <emphasis level='strong'/>  We’re done. Well done You. ", "", "true"));
}

function handleAbsRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Welcome to the abs workout.  Forget about that stuffed crust pizza you were going to get later. Here are ten sit-ups in ten seconds. Ready? Three. Two. One. Go. <break time='0.5s'/> one  <break time='1s'/> two  <break time='1s'/> three <break time='1s'/> four  <break time='1s'/> five  <break time='1s'/> six  <break time='1s'/> seven <break time='1s'/> eight  <break time='1s'/> nine  <break time='1s'/> ten.    We’re done. Well done You. ", "", "true"));
}

function handleBootyRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Welcome to the booty workout. You must perform ten regular squats in ten seconds. Ready? Three. Two. One.  Go. <break time='0.5s'/> one  <break time='1s'/> two  <break time='1s'/> three  <break time='1s'/> four <break time='1s'/> five <break time='1s'/> six  <break time='1s'/> seven <break time='1s'/> eight  <break time='1s'/> nine  <break time='1s'/> ten.  We’re done. Well done You. ", "", "true"));
}

function handleYogaRequest(intent, session, callback) {
    callback(session.attributes,
        buildSpeechletResponseWithoutCard("Welcome to the yoga workout. You must perform. A ten second leg stretch. Ready? Three. Two. One. Go. <break time='1s'/> one  <break time='1s'/> two  <break time='1s'/> three  <break time='1s'/> four  <break time='1s'/> five <break time='1s'/> six  <break time='1s'/> seven  <break time='1s'/> eight  <break time='1s'/> nine  <break time='1s'/> ten.  We’re done. Well done You. ", "", "true"));
}


/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
            ", sessionId=" + session.sessionId);
   
}

// skills behavior



function getWelcomeResponse(callback) {
    
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to Stay Fit, please say the workout you would like to do today. Just say booty, abs, cardio or yoga.";
   
    var repromptText = "Are trying to avoid the workout now? Please tell me what are you going to work on today? ";
    var shouldEndSession = false; 

    callback(sessionAttributes,
             buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}
// responses

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: "SessionSpeechlet - " + title,
            content: "SessionSpeechlet - " + output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}



function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
             "type": "SSML",
            "ssml": "<speak>" + output + "</speak>"
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}