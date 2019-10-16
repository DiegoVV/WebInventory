# WebInvetory
Website dedicated to creating and storing simple product information

I'm using PouchDB as my database. You can learn more about it here: https://pouchdb.com/getting-started.html but to run it locally all you need is to open a console on the project's directory (where the index.html is located) and run:

python -m SimpleHTTPServer  # for Python 2
OR
python -m http.server       # for Python 3

In my case "python -m http.server" worked. The website will be hosted on http://127.0.0.1:8000/