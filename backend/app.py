from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
app = Flask(__name__)
CORS(app)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.route("/chat", methods=["POST"])
def chat():
    try:
        chat = client.chats.create(model="gemini-2.5-flash")
        while True:
            user_input = request.json.get("message")
            if user_input.lower() == "exit":
                break
            response = chat.send_message(user_input)    
            return jsonify({
                "response": response.text
            })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)