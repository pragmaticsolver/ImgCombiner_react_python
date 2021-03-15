# server.py
# Import the Flask class. An instance of this class will be our WSGI application.
from flask import Flask, render_template, redirect, url_for, request
from PIL import Image
import requests
import io
import string 
import random 

# Next we create an instance of this class. The first argument is the name of the application’s module or package. 
# If you are using a single module (as in this example), you should use name because depending on if 
# it’s started as application or imported as module the name will be different ('main' versus the actual import name). 
# This is needed so that Flask knows where to look for templates, static files, and so on.
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# We then use the route() decorator to tell Flask what URL should trigger our function.
# The function is given a name which is also used to generate URLs for that particular function, 
# and returns the message we want to display in the user’s browser.
@app.route("/")
def index():
	return render_template("index.html")

@app.route("/image", methods = ['POST', 'GET'])
def combine_imgs():
	if request.method == 'POST':
		json_data = request.get_json()
		head_url = json_data["head_url"]
		body_url = json_data["body_url"]

		response = requests.get(body_url)
		img_body = Image.open(io.BytesIO(response.content))

		response = requests.get(head_url)
		img_head = Image.open(io.BytesIO(response.content))

		img_body.paste(img_head, (555, -186), img_head) # in correct locatoin

		rand_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k = 10))
		filename = rand_str + ".png"
		save_path = "../static/dist/images/" + filename

		img_whole_save = img_body.save(save_path)   # save a image using extension
		
		return filename

if __name__ == "__main__":
	app.run()