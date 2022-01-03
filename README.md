# AAEU (Assistive Application for Emergency Use)

## Inspiration
During the COVID-19 pandemic, we saw many healthcare workers in the frontline of our battle to overcome the coronavirus. Although we, as high schoolers and college student, couldn't make much difference like our heroes do, we wanted to find a way to save people's lives with what we are good at: programming. We believe that although computer science and medicine are two very different fields, the intersection between those two can greatly impact and benefit the whole society. So, we created our application, the Assistive Application for Emergency Use.
## What it does
We built our application in three different modes. 
1. **Tracker**: for specific health conditions, such as diabetes and high blood pressure. Currently, those two are only available health conditions, but we can definitely expend on it. For diabetes, the program will track time for insulin injection and remind patients. For high blood pressure, it will track loud and hard yelling or high heart beat (if we can connect a watch to the application) and advise the patient to calm down. If allowed, the program will play calming music to relax the patient.
2. **Critical**: for people who have critical health conditions and are at risk of emergency at any time when left alone. This mode will allow users to set up a secret word(s) to say when they need 911 called immediately, but are not able to directly call the responders. The program will be constantly listening for the secret word they set up, and when the program hears the secret word (or simply "help me" or "call 911"), it will call 911 to the patient's location. This mode will constantly be alert for emergency distress phrases, even the slightest ones.
3. **Non-Critical**: for users with little to no critical health condition. Listens for emergency commands like the critical mode, but the program is in less alert. Users can also set up a different command for emergencies like kidnap and domestic violence. When the program hears the secret command, the program will alert 911 and start recording the surrounding in order to allow the responders to know the situation in the surrounding. Using Symbl.ai API, the program will detect keywords like "weapon", "gun", and "shoot" to allow the first responders to be prepared. This will allow more effective rescuing.

## How we built it
We used python as our backend and websocket. We utilized [Symbl.ai](https://symbl.ai) to greatly expand the capacity of the program. For our frontend, we used html, javascript, and css to build our website where users can learn more about Assistive Application for Emergency Use, as well as test the web version of it. Due to limited time of this hackathon, we could not build a complete app for our program. 
## Challenges we ran into
One challenge we faced involved our idea for the hackathon. In fact, Assistive Application for Emergency Use wasn't our original idea. We originally planned to create an AI cognitive chatbot for mental health patients that could send over the main points of the conversation (using Symbl.ai) to the therapist.  However, due to unforeseen challenges, we could had to modify our idea to complete the hackathon with limited time. More detailed challenge can be found in _**What we learned**_ section. 

Another challenge we faced were programming challenges. Specifically, we at first had difficulty using Symbl.ai API. For example, we first had difficulty on how to extract only the necessary information from `get_messages()` and `get_topics()` functions. However, through teamwork, we were eventually able to overcome this and other programming challenges. 
## Accomplishments that we're proud of
We are proud that we have completed this hackathon and created a working program despite the time limit and all the challenges we faced. We are proud that we have tried something new, and we were able to accomplish our goals as a team. Below are some more specific accomplishments that we are proud of: 
- Using Symbl.ai API to create our program
- Creating working websockets to connect our backend to our frontend
- Finishing our project and code even though we ran into thousands of errors 
- Creating an innovative program that spreads positive influence in the community
- Learning to effectively work as a team

## What we learned
Referring back to the first challenge we ran into, we found out that the chatbot was difficult and took a long time to train. There were a lot of steps involving data scraping, preprocessing, training, and testing. We tried to implement different models such as the Transformers and LSTM, but it was more difficult and complicated than we had expected. We looked for other pre-trained models and APIs we could use, but we couldn't find a perfect one for our program. 

We also learned to become better programmers. For example, we learned how to create websockets or how to use python to create real-life problem solving applications. Through the millions of errors we faced while programming, we were able to be more patient with ourselves and learned to problem-solve many the issues. 
## What's next for Assistive Application for Emergency Use
Like mentioned earlier, our current program is only in a web format. We can definitely expand it to an mobile app for easier use. We can also include more health condition issues in our tracker to increase our target market. 

Thank you StemWarriorHacks and Symbl.ai for providing us this unique opportunity to gain our experience and grow intellectually!

Email of team:
sanghyuk.eric@gmail.com,
gl91306@student.musd.org,
normalwilsonwu@gmail.com,
dashashutosh1999@gmail.com
