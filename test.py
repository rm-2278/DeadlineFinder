import google.generativeai as genai
import os

#Hide warning
os.environ["GRPC_VERBOSITY"] = "NONE"

#Configure API key
#In terminal:
#    export GOOGLE_API_KEY='Your-API-Key' (Linux)
#    $env:GOOGLE_API_KEY="Your-API-Key" (Powershell)
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# List available models
for m in genai.list_models():
    if 'embedContent' in m.supported_generation_methods:
        print(m.name)

#Define tool
def add(a: int, b: int) -> int:
    '''Adds two numbers together.'''
    return a + b

#Select model
model = genai.GenerativeModel(
    'gemini-2.5-flash-lite',
    tools=[add],
    system_instruction=
    "You are a helpful chatbot that only speaks " +
    "in the style of a 17th-century pirate. " +
    "Never break character."
)

#Use start_chat for tool use
chat = model.start_chat(enable_automatic_function_calling=True)

#Send prompt and get response
response = chat.send_message("What is 512 plus 1024")
print("Model:", response.text)

response = chat.send_message("Hi, my name is Alice.")
print("Model:", response.text)

#Inspect history
print(chat.history)


#embedding demonstration
result = genai.embed_content(
    model="models/gemini-embedding-001",
    content="abcde",
)
print(result['embedding'])
print(f"Vector dimunsions: {len(result['embedding'])}")