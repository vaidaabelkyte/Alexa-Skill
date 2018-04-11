<h1>Alexa Custom Skill Development Guide</h1>
<h3><i>Detailed explanation of Amazon Alexa echo skill development process and configuration</i></h3>
<h4Gesture Based UI Development Module<br>
Student - Vaida Abelkyte<br>
Year - 4</h4>
<hr/>

<h3><i>About Alexa</h3>
<p>
Alexa is a virtual personal assistant designed to compete with the likes of Apple's Siri, Google Now, and others. Alexa, which was designed by Amazon's secretive Lab126, can listen to voice commands and respond with contextual responses to help to get the job done. Alexa can help to listen to tracks on Spotify, create to-do lists, shop, and even control the smart home products, like Google's Nest thermostat or the Philips Hue.<br>

Alexa was popularized by the Amazon Echo, a device that acts both as a speaker and a smart-home hub, but also works on many other devices.<br>
</p>

<h3><i>Alexa Skills</h3>
<p>
Alexa Skills extend the virtual assistant's appeal. The Skills are offered from both Amazon and third-party developers, and act as virtual apps to expand Alexa's features.<br>

Skills can span many industries, including sports, entertainment, news and social media. There's no limit to the number of Skills users can add, but it can be challenging to keep track of their features and remember to use ones you added several months ago. Luckily, the Alexa companion app lists all of the Skills you've downloaded, so you can quickly refer to them and see what commands are available.<br>

Currently, there are more than 3,000 Alexa Skills for users to download from both Amazon and third-party providers. The Skills are available for free in the mobile companion app or online via Amazon's Alexa portal.<br>
</p>



<p>
  <b><i>Alexa skill is a capability of the Alexa device.<br></></b>
  Most popular skills:<br>
 - Custom skills (for using browser and getting info or playing interractive games with your Alexa)<br>
 - Smart home skills (like turning on and off the lights).

</p>

<h3><i>Basic Requirements to start developing Skill for Alexa</h3>
<p>
1. Visual studio 2015 or newer with <a href="https://aws.amazon.com/visualstudio/"> AWS Toolkit for Visual Studio </a><br> <br>
2. Sign up for <a href="https://aws.amazon.com/"> AWS Account </a>  (Free but requires credit card)<br><br>
3. Sign up for an <a href="https://developer.amazon.com/"> Amazon Developer account </a>  (Free) <br><br>  
4. Ceate the user at AWS Services in IAM Management Console and link it to AWS explorer in Visual Studio with the user name and region.

</p>

<h3><i>Main components of a Custom Skill</h3>

Skill is broken into 2 parts:
1. Skill service running inside the service container (usually AWS lambda)
2. Skill interface (user voice interface configuration)

<h3>Start-Up</h3>

- Set of Intents that represent actions that user can do with the skill<br>
- Set of sample utterances that specify words and phrases<br>
- Choose an invocation name that identifies the skill<br>
- Set the cloud-based service that accepts these intents and acts on them<br>
- Complete the configuration in the developer portal account that combines all this<br><br>
Learn more about <a href="https://developer.amazon.com/docs/custom-skills/create-intents-utterances-and-slots.html"> Intents, Utterances, and Slots </a>

<h4>Intent is the way of describing what will be done with what someone says to Alexa</h4>

An example where <b>OneShotTideIntent</b> is mapped to several <b> utterences</b>:<br>
<i>
OneShotTideIntent get high tide<br>
OneShotTideIntent  get hight tide for city {city}<br>
OneShotTideIntent tide information for {city}<br>
OneShotTideIntent when is high tide in {city}<br>
</i><br>

When someone says <i><b> "Alexa, get hight tide for Galway from Tide Pooler" </i> </b>--> <b>get high tide for Galway</b>
is a <b>Utterence</b>
and <b>Tide Pooler</b> is an <b>Invocation name</b><br>

<i>The invocation name does not have to match the Intent</i>.<br>

<b>{city}</b> is a <b> Slot </b>- variable/parameter. In the example above <b>Galway</b> is the <b>Slot.</b><br>

The structure above together with Intents and Utterences and Slots is called an <i><b>Interaction Model</b></i> which is done in Developer portal.<br>
***************************************************************
How does it work:
1. User's speech is treemed to the Alexa service in the cloud.
2. Alexa recognises that Tide Pooler skill belongs to OneShotIntent.
3. Alexa structures into a request and sends the request to the service defined. The request includes the value "Galway" as the {City}.
4. The <i>Tide Pooler</i> service gets the request and takes action.
5. Tide Pooler sends the Alexa service a structured response with the text to speak to the user.
6. Alexa-anabled device speaks the responce back to user.
**************************************************************

<i>Skill interface is handled in Amazon developer Portal</i><br>
<i>Skill service in handled in AWS Lambda</i> 

<h3>My first atempt in developing Custom Skill for my Alexa echo device</h3>

-It is called <b>Country Details by Vaida</b>. <br>
-I chose <b>C#</b> as a programming language for a Skill service (.NET Core app)<br>
-Used <b>AWS Nuget packages</b> for handling Alexa Skill request/responses.<br>
-Service is hosted in <b>AWS Lambda </b> (Serverless)<br>
-Used <a href="https://restcountries.eu/"> REST service that returns country details </a><br>

![si_20180407_031554](https://user-images.githubusercontent.com/15648433/38450260-a501f6c2-3a12-11e8-88b3-d446e186ee6e.jpg)


<i><b>Steps for building the skill:</b></i>

1. Design the <b>Voice User Interface</b><br>
<b>Utterences</b> for the skill:<br>
<i>"Alexa, ask Country Detail the capital of Ireland"</i>  -----> <b>CountryDetailIntent the capital of {Country}</b><br>
<i>"Alexa, get the capital of Ireland from Country Detail"</i> -----> <b>CountryDetailIntent get the capital of {Country}</b><br>
<i>"Alexa", ask Country Detail about Ireland </i>----> <b>CountryDetailIntent about {Country}</b><br>
<b>Slot :</b>
<i>{Country} </i>variable name.<br>
More about <a href="https://developer.amazon.com/docs/custom-skills/slot-type-reference.html"> Alexa Slots </a>

2. Set up the Skill<br>
Log into <a href="https://developer.amazon.com/"> Amazon Developer portal </a> <br>
Navigate to Alexa and start creating a new skill<br>
Fill up the required info ---> name of the skill and type (custom or smart home)<br>
Fill up the <b>Interaction model</b>. Declare <b>Intent</b> name ---> <b>CoutryDetailIntent</b> and fill up <b>Utterences</b> and select the <b>Slots</b><br>

3. Write and Test the code<br>
Create  <b>AWS Lambda project</b> (.NET Core)<br><br>
Add <b>Nugget package</b> for talking and undestanding Alexa messages.<br>
Add <b>Alexa.NET Core library</b> for handling Alexa skill requests/responces.<br>
Write a code for simple interaction.<br>
Publish the <b>LambdaAlexa</b> to <b>AWS service</b> <i>(basicExecution is the recommended role to give to funcion because it allows to write to CloudWatch logs)</i><br><br>
<i>Testing can be done in <b>VS</b> by selecting <b>Alexa Intent - MyColoris</b> in Example Requests window. (Will get a response by clicking Invoke Button)<br></i><br>
The function is now "pushed" into <b>AWS developer console</b> and can be found in services under <a href="https://aws.amazon.com/lambda/"> Lambdas </a><br> 
Add the <b>Trigger</b>  called <b>Alexa Skills Kit</b> to give Alexa the permissions to lunch the function.<br>
After the built is complete, the testing is available in the developer portal with the Alexa voice simulator or can be done on Your echo device.

<h4>Stay Fit Skill</h4>
Another folder in this repository contains the fitness skill I developed on Amazon Service Colsole. For this skill I did not use local machine to create a project.
I created an empty Lambda function directly on Amazon service. After adding trigger Alexa Skill Kit, I was able to write the code  and save the stage of the function as long as I was going with the development, (less configuration).
Interaction model was made the same way as for the skill Country Details. For the second skill I did not use slot types by Amazon. I created my own related to the intents i created.
Stay fit skill uses different module of request an responce.
The skill starts when user says invocation name == Alexa, open Stay Fit. Alexa asks user to chose what type of exercise user wants and waits for responce (slot). After user says one of 4 choices, Alexa continues with the skill and gives detail of the exercise as well as doing counting 1 per 1 sec.




<h4>Conclusion</h4>
The Country Detail Skill is not published to Amazon store. It was only developed for educational purposes. (works only on my own Alexa) And the Stay Fit Skill is in the process of certification<br>
I learned alot about how Amazon services work and how to configure them for my project. Also learned how to use Developer Portal and the process of creating a new Skill. I am definitely going to create more Skills.







