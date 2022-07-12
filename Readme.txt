README
Name: 
Tanmay Khandelwal
Assignment Name: 
Programming Assignment 1
Date: 
04/26/2022
Description: 
For this assignment, I have used node.js to create a web server that displays the index page of SCU’s website. I have incorporated an event driven architecture for each request that comes to the web server. After it processes the request, the connection gets terminated. The web server runs on 127:0.0.1:<port>. The webs server fetches the files from the directory specified. If the port and the directory isn’t specified then the default values are used. Default port is 8000 and the default directory is the directory inside which the app.js file is present. The web server runs indefinitely.
Submitted Files:
Instructions:


To Execute the system must have Nodejs version && NPM (node package manager) 
To install: $ sudo apt install nodejs npm


Before running the web server you need to extract the content of the zip file name, “web”(check the script file to see what the directory should look like), into the directory of your choice.
After extracting the directory you specified should contain the following items:
1. Index.html
2. SCU Login.html
3. SCU Login_files (folder)
4. Home - Santa Clara University_files (folder)
After doing that there are two ways to execute the web server depending on where you extracted the files.
        First you have to open the terminal and navigate to the directory where the server and app.js file is located.
1. If you have extracted the file inside the same folder where the app.js and server file is present then you can simply write ./server
2. If you have extracted it in a different directory then you need to type the command ./server -document_root "/home/moazzeni/webserver_files" -port 8888


Other Information:
The SCU logo and some other icons, at the bottom of the page, do not appear in google chrome, however they seem to appear in safari. I have mainly used safari for testing purposes.