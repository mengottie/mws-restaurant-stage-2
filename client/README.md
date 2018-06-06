#Install client
To install the client follow this procedure:
1. install package dependency. From client directory run command:
```
npm install
```
2. generate client site into dist directory. From the client directory run the command:
```
gulp dist
```
3. run client site. From the dist directory run the command:
```
python -m http.server 8000
```
4. Run the server Rest API from the directory server following the instruction on the README.md
