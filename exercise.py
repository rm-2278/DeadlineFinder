import google.generativeai as genai
import os

#Hide warning
os.environ["GRPC_VERBOSITY"] = "NONE"

#Configure API key
#In terminal:
#    export GOOGLE_API_KEY='Your-API-Key' (Linux)
#    $env:GOOGLE_API_KEY="Your-API-Key" (Powershell)
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])


# # List available models
# for m in genai.list_models():
#     if 'generateContent' in m.supported_generation_methods:
#         print(m.name)

#Initialize model
model = genai.GenerativeModel(
    'gemini-2.5-flash',
    system_instruction = '''You are a chatbot answering users question.
    The prompt will start with the chat history,
    followed by 
    User: (latest user prompt)
    at the end. Create a new response. 
    If no history, it means it is the start of the conversation.''',
)

summary_model = genai.GenerativeModel(
    'gemini-2.5-flash',
    system_instruction = '''You create a summary of 
    the chat history. You will be given the previous chat history as well as the new content.
    The new content will be at the end with the following format.
    User: (user input)
    Chatbot: (response)
    Create the new version of the summary of the chat history. ''',
)

#Create chat
prompt = input("User: ")
history = ""
#User input & response until user end chat.
while prompt.lower() != "end chat":
    #Generate and output response
    response = model.generate_content(history + "User: " + prompt)
    print("Chatbot: " + response.text)
    
    #Update history
    history = summary_model.generate_content(history
                                          + "\nUser: " + prompt
                                          + "\nChatbot: " + response.text).text
        
    print(history)
    #Take user input
    prompt = input("User: ")

print("Chat ended")


